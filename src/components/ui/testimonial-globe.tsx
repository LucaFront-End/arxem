"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import createGlobe from "cobe";
import type { Globe } from "cobe";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

type Vec3 = [number, number, number];
type GlState = "pending" | "ready" | "unavailable";
type Tone = 1 | 2 | 3 | 4 | 5;

export interface GlobeTestimonial {
  id: string;
  /** One or two sentences. Longer quotes are clamped to four lines. */
  quote: string;
  name: string;
  role?: string;
  company?: string;
  /** City shown on the card and in the pin's accessible name. */
  city: string;
  /** Short country/state code such as "MX · NL". Distinct values feed the counter. */
  country?: string;
  /** Pin latitude in degrees (south is negative). */
  lat: number;
  /** Pin longitude in degrees (west is negative). */
  lng: number;
  /** Square portrait shown in the pin and on the card. */
  image: string;
  /** Star rating from 1 to 5. */
  rating?: number;
  /** Ring color tone (1..5). */
  tone?: Tone;
  /** Optional product or certification tag in ARXEM style. */
  productTag?: string;
}

export interface TestimonialGlobeLabels {
  previous: string;
  next: string;
  pin: string;
}

export interface TestimonialGlobeProps extends React.ComponentProps<"section"> {
  items: GlobeTestimonial[];
  eyebrow?: string;
  headingLight?: string;
  heading?: string;
  caption?: string;
  action?: React.ReactNode;
  autoRotate?: boolean;
  rotationSpeed?: number;
  autoplay?: boolean;
  interval?: number;
  active?: number | null;
  onActiveChange?: (index: number | null) => void;
  size?: number;
  labels?: TestimonialGlobeLabels;
}

const GLOBE_RADIUS = 0.8; // cobe draws the sphere at 0.8 of the half-canvas
const THETA = 0.28; // tilt toward the viewer, in radians
const PIN_ALTITUDE = 0.05; // pins float just above the map
const DRAG_FRICTION = 0.92; // per 60 Hz frame
const RELEASE_GRACE_MS = 80;
const TEXTURE_RETRY_MS = [150, 600, 1500];
const TURN_MS = 1200; // a featured pin reaches the front in this time
const SWAP_MS = 240;
const HOLD_MS = 7000; // a clicked pin keeps the globe paused this long
const DRAG_SLOP = 6;
const SWIPE_MIN = 40;
const WIDE_MIN = 620;
const FRONT_MARGIN = 0.06;
const MAX_CONTENT = 1280;

const DEFAULT_LABELS: TestimonialGlobeLabels = {
  previous: "Reseña anterior",
  next: "Siguiente reseña",
  pin: "Ver testimonio de",
};

const RING: Record<Tone, string> = {
  1: "ring-[#0052FF]",
  2: "ring-[#D97706]",
  3: "ring-[#059669]",
  4: "ring-[#0D1117]",
  5: "ring-[#2563EB]",
};

const PING: Record<Tone, string> = {
  1: "border-[#0052FF]",
  2: "border-[#D97706]",
  3: "border-[#059669]",
  4: "border-[#0D1117]",
  5: "border-[#2563EB]",
};

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (t: number) => t * t * (3 - 2 * t);

function toneOf(item: GlobeTestimonial, index: number): Tone {
  return item.tone ?? (((index % 5) + 1) as Tone);
}

function toCartesian(lat: number, lng: number): Vec3 {
  const la = (lat * Math.PI) / 180;
  const lo = (lng * Math.PI) / 180 - Math.PI;
  const c = Math.cos(la);
  return [-c * Math.cos(lo), Math.sin(la), c * Math.sin(lo)];
}

// Same rotation cobe applies on the GPU, so the HTML pins stay glued to the map.
function project([x, y, z]: Vec3, phi: number, theta: number, altitude: number) {
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const radius = GLOBE_RADIUS * (1 + altitude);
  const sx = (cp * x + sp * z) * radius;
  const sy = (sp * st * x + ct * y - cp * st * z) * radius;
  const depth = -sp * ct * x + st * y + cp * ct * z;
  return { x: (sx + 1) / 2, y: (1 - sy) / 2, depth, rim: Math.hypot(sx, sy) - GLOBE_RADIUS };
}

/** The rotation that turns a longitude to face the viewer. */
function facingPhi(lng: number) {
  return (3 * Math.PI) / 2 - (lng * Math.PI) / 180;
}

/** The copy of `angle` (mod 2π) closest to `from`, so every turn takes the short way round. */
function nearestTurn(from: number, angle: number) {
  const tau = Math.PI * 2;
  return angle + tau * Math.round((from - angle) / tau);
}

// Pins thin out toward the horizon and vanish once the sphere hides them.
function pinOpacity(depth: number, rim: number) {
  if (depth >= 0) return 0.45 + 0.55 * smooth(clamp01(depth / 0.3));
  const exposed = Math.max(clamp01(rim / 0.04), clamp01(1 + depth * 8));
  return 0.45 * exposed * clamp01(1 + depth * 3);
}

// …and shrink as they roll away, so the face of the globe reads as near and the rim as far.
function pinScale(depth: number) {
  return 0.64 + 0.36 * smooth(clamp01((depth + 0.2) / 0.7));
}

// Exponential ease-out over a fixed time: a quick start, then a long settle onto the target.
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : (1 - Math.pow(2, -10 * t)) / (1 - Math.pow(2, -10));
}

function useDevicePixelRatio() {
  const [dpr, setDpr] = React.useState(() =>
    typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 2),
  );
  React.useEffect(() => {
    let query: MediaQueryList | null = null;
    const watch = () => {
      query?.removeEventListener("change", watch);
      setDpr(Math.min(window.devicePixelRatio || 1, 2));
      query = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      query.addEventListener("change", watch);
    };
    watch();
    return () => query?.removeEventListener("change", watch);
  }, []);
  return dpr;
}

const STAR_POINTS = Array.from({ length: 10 }, (_, k) => {
  const r = k % 2 ? 4.1 : 9.4;
  const a = (k * Math.PI) / 5 - Math.PI / 2;
  return `${(10 + r * Math.cos(a)).toFixed(2)},${(10.6 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className}>
      <polygon points={STAR_POINTS} fill="currentColor" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function Portrait({ src, className }: { src: string; className?: string }) {
  const [failed, setFailed] = React.useState(false);
  const [shownSrc, setShownSrc] = React.useState(src);
  if (shownSrc !== src) {
    setShownSrc(src);
    setFailed(false);
  }
  if (failed) {
    return (
      <span className={cx("grid place-items-center bg-[#EFECE6] text-[#0D1117]/50", className)}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3/5 h-3/5" fill="currentColor">
          <circle cx="12" cy="8.5" r="4" />
          <path d="M4.5 21c.8-4.1 3.8-6.4 7.5-6.4s6.7 2.3 7.5 6.4Z" />
        </svg>
      </span>
    );
  }
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      decoding="async"
      className={cx("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}

interface QuoteCardProps {
  item: GlobeTestimonial;
  index: number;
  tone: Tone;
  roomy: boolean;
  mode: "current" | "leaving" | "sizer";
}

// Memoised with forwardRef for React 18 compatibility
const QuoteCard = React.memo(
  React.forwardRef<HTMLElement, QuoteCardProps>(function QuoteCard(
    { item, index, tone, roomy, mode },
    ref,
  ) {
    const rating = item.rating === undefined ? null : Math.max(0, Math.min(5, Math.round(item.rating)));
    const hidden = mode !== "current";
    const meta = [item.role, item.company].filter(Boolean).join(" · ");

    return (
      <figure
        ref={ref}
        data-quote-card={mode === "current" ? "" : undefined}
        data-quote-leaving={mode === "leaving" ? "" : undefined}
        data-index={mode === "current" ? index : undefined}
        aria-hidden={hidden || undefined}
        className={cx(
          "relative col-start-1 row-start-1 m-0 flex min-w-0 flex-col overflow-hidden rounded-[28px] border border-[#0D1117]/[0.08] bg-white text-[#0D1117] shadow-[0_24px_60px_-18px_rgba(13,17,23,0.08)]",
          roomy ? "p-7 sm:p-8" : "px-5 py-4",
          mode === "sizer" && "invisible pointer-events-none",
          mode === "leaving" && "pointer-events-none",
        )}
      >
        <div className={cx("relative flex items-center gap-3", roomy ? "h-7 pr-28" : "h-6 pr-24")}>
          {rating !== null && (
            <span role="img" aria-label={`Calificación ${rating} de 5`} className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((k) => (
                <StarIcon
                  key={k}
                  className={cx("w-3.5 h-3.5", k < rating ? "text-[#D97706]" : "text-[#0D1117]/15")}
                />
              ))}
            </span>
          )}
          {item.productTag && (
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#0052FF] font-semibold truncate">
              {item.productTag}
            </span>
          )}
        </div>

        <blockquote
          style={{ fontFamily: "'Outfit', sans-serif" }}
          className={cx(
            "relative m-0 line-clamp-4 text-pretty font-light text-[#0D1117]/85",
            roomy ? "mt-4 text-[18px] leading-[1.6]" : "mt-3 text-[15px] leading-[22px]",
          )}
        >
          <p>“{item.quote}”</p>
        </blockquote>

        <figcaption
          className={cx(
            "relative mt-auto flex items-center gap-3.5 border-t border-[#0D1117]/[0.06]",
            roomy ? "pt-5 mt-6" : "pt-3.5 mt-4",
          )}
        >
          <span
            className={cx(
              "relative block shrink-0 overflow-hidden rounded-full bg-[#EFECE6] ring-2 ring-offset-2 ring-offset-white",
              RING[tone],
              roomy ? "w-11 h-11" : "w-9 h-9",
            )}
          >
            {mode !== "sizer" && <Portrait src={item.image} className="w-full h-full" />}
          </span>
          <span className="min-w-0 flex-1">
            <span
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="flex items-center gap-1.5 truncate text-sm font-extrabold text-[#0D1117]"
            >
              <span className="truncate">{item.name}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
            </span>
            {meta && <span className="block truncate text-xs text-[#0D1117]/55">{meta}</span>}
          </span>
          <span className="shrink-0 text-right text-xs leading-tight text-[#0D1117]/50">
            <span className="block font-medium text-[#0D1117]/75">{item.city}</span>
            {item.country && (
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-[#0D1117]/40">
                {item.country}
              </span>
            )}
          </span>
        </figcaption>
      </figure>
    );
  }),
);

interface PinProps {
  item: GlobeTestimonial;
  index: number;
  tone: Tone;
  size: number;
  label: string;
  featured: boolean;
  approaching: boolean;
  pressed: boolean;
  tabbable: boolean;
  register: (index: number, el: HTMLButtonElement | null) => void;
  onEnter: (index: number, event: React.PointerEvent) => void;
  onLeave: (index: number, event: React.PointerEvent) => void;
  onPress: (index: number) => void;
  onKey: (index: number, event: React.KeyboardEvent) => void;
  onFocusPin: (index: number, target: HTMLElement) => void;
}

const Pin = React.memo(function Pin({
  item,
  index,
  tone,
  size,
  label,
  featured,
  approaching,
  pressed,
  tabbable,
  register,
  onEnter,
  onLeave,
  onPress,
  onKey,
  onFocusPin,
}: PinProps) {
  return (
    <button
      ref={(el) => register(index, el)}
      type="button"
      data-pin={index}
      data-featured={featured ? "" : undefined}
      data-target={approaching ? "" : undefined}
      tabIndex={tabbable ? 0 : -1}
      aria-label={label}
      aria-current={featured ? "true" : undefined}
      aria-pressed={pressed}
      className="group/pin absolute left-0 top-0 rounded-full opacity-0 outline-none will-change-transform"
      style={{ width: size, height: size }}
      onPointerEnter={(event) => onEnter(index, event)}
      onPointerLeave={(event) => onLeave(index, event)}
      onClick={() => onPress(index)}
      onKeyDown={(event) => onKey(index, event)}
      onFocus={(event) => onFocusPin(index, event.currentTarget)}
    >
      <span
        aria-hidden="true"
        data-ping
        className={cx(
          "pointer-events-none absolute inset-0 rounded-full border-2 animate-ping [animation-duration:3s]",
          PING[tone],
          featured || approaching ? "opacity-75" : "opacity-25",
        )}
        style={{ animationDelay: `${(index % 5) * 0.6}s` }}
      />
      <span
        data-pin-face
        className={cx(
          "relative block w-full h-full overflow-hidden rounded-full bg-white shadow-md ring-offset-2 ring-offset-white transition-all duration-200 ease-out",
          RING[tone],
          featured ? "scale-[1.32] ring-[2.5px] shadow-lg" : "ring-2",
        )}
      >
        <Portrait src={item.image} className="block w-full h-full" />
      </span>
    </button>
  );
});

interface Turn {
  from: number;
  to: number;
  start: number;
  index: number;
  commit: boolean;
}

export const TestimonialGlobe = React.forwardRef<HTMLElement, TestimonialGlobeProps>(
  function TestimonialGlobe(
    {
      items,
      eyebrow,
      headingLight,
      heading,
      caption,
      action,
      autoRotate = true,
      rotationSpeed = 0.11,
      autoplay = true,
      interval = 4200,
      active,
      onActiveChange,
      size = 460,
      labels,
      className,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) {
    const text = { ...DEFAULT_LABELS, ...labels };
    const count = items.length;
    const headingId = React.useId();
    const rootRef = React.useRef<HTMLElement | null>(null);
    const stageRef = React.useRef<HTMLDivElement | null>(null);
    const globeBoxRef = React.useRef<HTMLDivElement | null>(null);
    const canvasHostRef = React.useRef<HTMLDivElement | null>(null);
    const pinRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const regionRef = React.useRef<HTMLDivElement | null>(null);
    const cardRef = React.useRef<HTMLElement | null>(null);
    const leavingRef = React.useRef<HTMLElement | null>(null);
    const leaderRef = React.useRef<SVGGElement | null>(null);
    const lineRef = React.useRef<SVGLineElement | null>(null);
    const startDotRef = React.useRef<SVGCircleElement | null>(null);
    const endDotRef = React.useRef<SVGCircleElement | null>(null);
    const globeRef = React.useRef<Globe | null>(null);
    const kickRef = React.useRef(() => {});
    const swipeRef = React.useRef<{ id: number; x: number; y: number } | null>(null);
    const writtenRef = React.useRef<{ el: HTMLElement; opacity: number; z: string; hit: string }[]>([]);

    const [width, setWidth] = React.useState(0);
    const [glState, setGlState] = React.useState<GlState>("pending");
    const [glVersion, setGlVersion] = React.useState(0);
    const [visible, setVisible] = React.useState(true);
    const [internal, setInternal] = React.useState<number | null>(count > 0 ? 0 : null);
    const [pinned, setPinned] = React.useState(false);
    const [hoverPin, setHoverPin] = React.useState<number | null>(null);
    const [cardHover, setCardHover] = React.useState(false);
    const [keyboard, setKeyboard] = React.useState(false);
    const [interacting, setInteracting] = React.useState(false);
    const [target, setTarget] = React.useState<number | null>(null);
    const dpr = useDevicePixelRatio();

    const controlled = active !== undefined;
    const requested = controlled ? active : internal;
    const featured =
      requested !== null && requested >= 0 && requested < count ? Math.floor(requested) : null;

    const pad = width >= 1024 ? 48 : width >= 620 ? 28 : width >= 420 ? 20 : 16;
    const inner = Math.max(0, Math.min(width, MAX_CONTENT) - pad * 2);
    const wide = inner >= WIDE_MIN;
    const diameter = Math.max(
      0,
      Math.round(
        width === 0
          ? Math.min(size, 320)
          : wide
            ? Math.min(size, inner * 0.46)
            : Math.min(size, 320, inner * 0.75),
      ),
    );
    const pinSize = diameter >= 380 ? 44 : diameter >= 300 ? 38 : 34;
    const columnGap = width >= 1024 ? 76 : 36;
    const roomy = wide && Math.min(inner - diameter - columnGap, 560) >= 400;
    const ready = glState !== "pending";
    const running =
      autoplay && count > 1 && !pinned && hoverPin === null && !cardHover && !keyboard && !interacting && visible;

    const live = React.useRef({
      phi: 0,
      theta: THETA,
      velocity: 0,
      dragging: false,
      interacting: false,
      pressed: false,
      moved: false,
      pointerId: -1,
      pressX: 0,
      pressY: 0,
      lastX: 0,
      lastMoveAt: 0,
      moveGap: 0,
      turn: null as Turn | null,
      vectors: [] as Vec3[],
      longitudes: [] as number[],
      depths: [] as number[],
      size: diameter,
      pin: pinSize,
      wide,
      featured: null as number | null,
      requested: null as number | null,
      front: -1,
      spin: false,
      follow: false,
      speed: rotationSpeed,
      onScreen: true,
      started: false,
      globeX: 0,
      globeY: 0,
      anchorX: 0,
      anchorY: 0,
      anchored: false,
      leaderShown: false,
      growStart: 0,
      growing: false,
      controlled,
      pinnedNow: false,
      onChange: onActiveChange,
    });

    const handlers = React.useRef({
      arrive: (_index: number) => {},
      front: (_index: number) => {},
      settle: () => {},
    });

    const setRoot = React.useCallback(
      (el: HTMLElement | null) => {
        rootRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      },
      [ref],
    );

    const kick = () => kickRef.current();

    const select = React.useCallback((index: number | null) => {
      const s = live.current;
      if (index === s.featured) return;
      s.requested = index;
      if (!s.controlled) {
        s.featured = index;
        s.growStart = performance.now();
        setInternal(index);
      }
      s.onChange?.(index);
    }, []);

    const turnTo = React.useCallback((index: number, commit: boolean) => {
      const s = live.current;
      const lng = s.longitudes[index];
      if (lng === undefined) return;
      if (s.turn && s.turn.index === index && s.turn.commit === commit) return;
      const to = nearestTurn(s.phi, facingPhi(lng));
      s.velocity = 0;
      s.turn = { from: s.phi, to, start: performance.now(), index, commit };
      kickRef.current();
    }, []);

    const go = React.useCallback(
      (index: number) => {
        select(index);
        turnTo(index, false);
      },
      [select, turnTo],
    );

    React.useLayoutEffect(() => {
      const s = live.current;
      if (s.vectors.length !== items.length) {
        s.front = -1;
        s.depths.length = items.length;
      }
      s.vectors = items.map((item) => toCartesian(item.lat, item.lng));
      s.longitudes = items.map((item) => item.lng);
      if (!s.started && diameter > 0) {
        s.started = true;
        const first = featured === null ? undefined : items[featured];
        if (first) s.phi = facingPhi(first.lng);
      }
      if (s.featured !== featured) {
        const fromHost = controlled && featured !== s.requested;
        s.featured = featured;
        s.requested = featured;
        s.growStart = performance.now();
        if (fromHost && featured !== null && s.started) turnTo(featured, false);
      }
      s.size = diameter;
      s.pin = pinSize;
      s.wide = wide;
      s.speed = rotationSpeed;
      s.controlled = controlled;
      s.pinnedNow = pinned;
      s.onChange = onActiveChange;
      s.spin = autoRotate && !pinned && !keyboard;
      s.follow = (!autoplay || interacting) && !pinned && hoverPin === null && !keyboard && !cardHover;
      handlers.current = {
        arrive: (index) => {
          setTarget(null);
          select(index);
        },
        front: (index) => select(index),
        settle: () => setInteracting(false),
      };
      kickRef.current();
    });

    React.useLayoutEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const measure = () => setWidth(root.clientWidth);
      const observer = new ResizeObserver(measure);
      observer.observe(root);
      measure();
      return () => observer.disconnect();
    }, []);

    const measureAnchor = React.useCallback(() => {
      const stage = stageRef.current;
      const box = globeBoxRef.current;
      const region = regionRef.current;
      const s = live.current;
      if (!stage || !box || !region) {
        s.anchored = false;
        return;
      }
      const sr = stage.getBoundingClientRect();
      const br = box.getBoundingClientRect();
      const rr = region.getBoundingClientRect();
      s.globeX = br.left - sr.left;
      s.globeY = br.top - sr.top;
      s.anchorX = rr.left - sr.left;
      s.anchorY = rr.top - sr.top + Math.min(48, rr.height / 2);
      s.anchored = rr.width > 0;
      kickRef.current();
    }, []);

    React.useLayoutEffect(() => {
      measureAnchor();
      const stage = stageRef.current;
      const region = regionRef.current;
      if (!stage || !region) return;
      const observer = new ResizeObserver(measureAnchor);
      observer.observe(stage);
      observer.observe(region);
      return () => observer.disconnect();
    }, [measureAnchor, wide, diameter]);

    React.useEffect(() => {
      const root = rootRef.current;
      if (!root) return;
      const s = live.current;
      const sync = () => {
        setVisible(s.onScreen && !document.hidden);
        kickRef.current();
      };
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        s.onScreen = entry?.isIntersecting ?? true;
        sync();
      });
      document.addEventListener("visibilitychange", sync);
      observer.observe(root);
      return () => {
        document.removeEventListener("visibilitychange", sync);
        observer.disconnect();
      };
    }, []);

    const place = React.useCallback((now: number) => {
      const s = live.current;
      const written = writtenRef.current;
      const { vectors, size: d, phi, theta } = s;
      let front = -1;
      let frontDepth = -Infinity;
      let featuredPoint: { x: number; y: number; depth: number; scale: number } | null = null;
      for (let i = 0; i < vectors.length; i++) {
        const vector = vectors[i];
        if (!vector) continue;
        const point = project(vector, phi, theta, PIN_ALTITUDE);
        s.depths[i] = point.depth;
        if (point.depth > frontDepth) {
          frontDepth = point.depth;
          front = i;
        }
        const el = pinRefs.current[i];
        if (!el) continue;
        const isFeatured = i === s.featured;
        const opacity = Math.round(pinOpacity(point.depth, point.rim) * 100) / 100;
        const scale = pinScale(point.depth);
        const z = String((isFeatured ? 100 : 0) + Math.round((point.depth + 1) * 40));
        const hit = opacity > 0.4 ? "auto" : "none";
        const prev = written[i]?.el === el ? written[i] : undefined;
        if (!prev || prev.opacity !== opacity) el.style.opacity = String(opacity);
        if (!prev || prev.z !== z) el.style.zIndex = z;
        if (!prev || prev.hit !== hit) el.style.pointerEvents = hit;
        written[i] = { el, opacity, z, hit };
        if (opacity > 0) {
          el.style.transform = `translate3d(${(point.x * d).toFixed(2)}px, ${(point.y * d).toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        }
        if (isFeatured) featuredPoint = { x: point.x * d, y: point.y * d, depth: point.depth, scale };
      }

      if (front >= 0 && front !== s.front) {
        const current = s.depths[s.front] ?? -Infinity;
        if (s.front < 0) s.front = front;
        else if (frontDepth > current + FRONT_MARGIN) {
          s.front = front;
          if (s.follow && !s.turn) handlers.current.front(front);
        }
      }

      const group = leaderRef.current;
      const line = lineRef.current;
      const startDot = startDotRef.current;
      const endDot = endDotRef.current;
      s.growing = false;
      if (!group || !line || !startDot || !endDot) return;
      const show = s.wide && s.anchored && !s.turn && !!featuredPoint && featuredPoint.depth > 0.15;
      if (show !== s.leaderShown) {
        s.leaderShown = show;
        group.style.opacity = show ? "1" : "0";
        if (show) s.growStart = now;
      }
      if (!show || !featuredPoint) return;
      const x0 = s.globeX + featuredPoint.x;
      const y0 = s.globeY + featuredPoint.y;
      const dx = s.anchorX - x0;
      const dy = s.anchorY - y0;
      const distance = Math.hypot(dx, dy) || 1;
      const gap = (s.pin / 2) * 1.35 * featuredPoint.scale + 6;
      const length = Math.max(0, distance - gap);
      const grow = smooth(clamp01((now - s.growStart) / 360));
      s.growing = grow < 1;
      const sx = x0 + (dx / distance) * gap;
      const sy = y0 + (dy / distance) * gap;
      line.style.transform = `translate(${sx.toFixed(2)}px, ${sy.toFixed(2)}px) rotate(${Math.atan2(dy, dx).toFixed(4)}rad) scaleX(${Math.max(0.001, length * grow).toFixed(2)})`;
      startDot.style.transform = `translate(${sx.toFixed(2)}px, ${sy.toFixed(2)}px)`;
      endDot.style.transform = `translate(${s.anchorX.toFixed(2)}px, ${s.anchorY.toFixed(2)}px) scale(${grow >= 1 ? 1 : 0})`;
    }, []);

    React.useLayoutEffect(() => {
      place(performance.now());
    }, [place, diameter, pinSize, featured, wide, count]);

    const hasSize = diameter > 0;

    React.useEffect(() => {
      const host = canvasHostRef.current;
      if (!host || !hasSize) return;
      const canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;display:block";
      host.appendChild(canvas);

      const s = live.current;
      let globe: Globe | null = null;
      try {
        // Minimalist alabaster & clinical cobalt Cobe configuration
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width: s.size,
          height: s.size,
          phi: s.phi,
          theta: s.theta,
          dark: 0,
          diffuse: 0.65,
          mapSamples: 16000,
          mapBrightness: 2.2,
          baseColor: [0.965, 0.965, 0.955],
          markerColor: [0, 0.32, 1],
          glowColor: [0.91, 0.92, 0.95],
          markers: [],
          markerElevation: 0,
        });
      } catch {
        globe = null;
      }
      const gl = globe
        ? ((canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as WebGLRenderingContext | null)
        : null;
      globeRef.current = globe;

      let raf = 0;
      let last = 0;
      let renderedSize = s.size;
      let phiLabel = "";
      const isBusy = () =>
        s.dragging ||
        s.interacting ||
        s.turn !== null ||
        s.growing ||
        Math.abs(s.velocity) > 1e-4 ||
        (s.spin && s.speed !== 0);

      const frame = (now: number) => {
        raf = 0;
        const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
        last = now;
        const turn = s.turn;
        if (turn) {
          const t = clamp01((now - turn.start) / TURN_MS);
          s.phi = turn.from + (turn.to - turn.from) * easeOutExpo(t);
          s.velocity = 0;
          if (t >= 1) {
            s.turn = null;
            s.phi = turn.to;
            if (turn.commit) handlers.current.arrive(turn.index);
          }
        } else if (!s.dragging) {
          if (Math.abs(s.velocity) > 1e-4) {
            const steps = dt * 60;
            s.phi += s.velocity * steps;
            s.velocity *= Math.pow(DRAG_FRICTION, steps);
          } else {
            s.velocity = 0;
            if (s.spin) s.phi += s.speed * dt;
          }
        }
        if (s.interacting && !s.dragging && s.velocity === 0) {
          s.interacting = false;
          handlers.current.settle();
        }
        if (globe) {
          if (s.size !== renderedSize) {
            renderedSize = s.size;
            globe.update({ phi: s.phi, theta: s.theta, width: s.size, height: s.size });
          } else {
            globe.update({ phi: s.phi, theta: s.theta });
          }
        }
        place(now);
        const label = s.phi.toFixed(2);
        if (label !== phiLabel) {
          phiLabel = label;
          host.dataset.phi = label;
        }
        if (isBusy() && s.onScreen && !document.hidden) raf = requestAnimationFrame(frame);
        else last = 0;
      };

      kickRef.current = () => {
        if (!raf) raf = requestAnimationFrame(frame);
      };
      kickRef.current();

      const retries = TEXTURE_RETRY_MS.map((ms) => window.setTimeout(() => kickRef.current(), ms));

      const onLost = (event: Event) => {
        event.preventDefault();
        setGlState("unavailable");
      };
      const onRestored = () => setGlVersion((v) => v + 1);
      canvas.addEventListener("webglcontextlost", onLost);
      canvas.addEventListener("webglcontextrestored", onRestored);
      setGlState(gl ? "ready" : "unavailable");

      return () => {
        cancelAnimationFrame(raf);
        retries.forEach((id) => window.clearTimeout(id));
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        kickRef.current = () => {};
        globe?.destroy();
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
        globeRef.current = null;
        host.replaceChildren();
        setGlState("pending");
      };
    }, [hasSize, dpr, glVersion, place]);

    React.useEffect(() => {
      if (!running) return;
      const id = window.setTimeout(() => {
        const next = ((live.current.featured ?? -1) + 1) % count;
        setTarget(next);
        turnTo(next, true);
      }, Math.max(0, interval - TURN_MS));
      return () => window.clearTimeout(id);
    }, [running, featured, interval, count, turnTo]);

    React.useEffect(() => {
      if (running) return;
      const s = live.current;
      if (s.turn?.commit) {
        s.turn = null;
        kickRef.current();
      }
      setTarget(null);
    }, [running]);

    React.useEffect(() => {
      if (!pinned) return;
      const id = window.setTimeout(() => setPinned(false), HOLD_MS);
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") setPinned(false);
      };
      document.addEventListener("keydown", onKey);
      return () => {
        window.clearTimeout(id);
        document.removeEventListener("keydown", onKey);
      };
    }, [pinned, featured]);

    const [cards, setCards] = React.useState({
      shown: featured,
      leaving: null as number | null,
      key: 0,
    });
    if (cards.shown !== featured) {
      setCards({ shown: featured, leaving: cards.shown, key: cards.key + 1 });
    }
    React.useLayoutEffect(() => {
      if (cards.key === 0) return;
      const enter = cardRef.current;
      const exit = leavingRef.current;
      enter?.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: SWAP_MS, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
      );
      exit?.animate(
        [
          { opacity: 1, transform: "translateY(0) scale(1)" },
          { opacity: 0, transform: "translateY(12px) scale(0.98)" },
        ],
        { duration: SWAP_MS, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" },
      );
      const key = cards.key;
      const id = window.setTimeout(
        () => setCards((c) => (c.key === key ? { ...c, leaving: null } : c)),
        SWAP_MS,
      );
      return () => window.clearTimeout(id);
    }, [cards.key]);

    const step = (delta: number) => {
      if (count === 0) return;
      go((((featured ?? (delta > 0 ? -1 : 0)) + delta) % count + count) % count);
    };

    const registerPin = React.useCallback((index: number, el: HTMLButtonElement | null) => {
      pinRefs.current[index] = el;
    }, []);

    const onPinEnter = React.useCallback(
      (index: number, event: React.PointerEvent) => {
        if (event.pointerType === "touch" || live.current.dragging) return;
        flushSync(() => {
          setHoverPin(index);
          select(index);
        });
      },
      [select],
    );

    const onPinLeave = React.useCallback((index: number, event: React.PointerEvent) => {
      if (event.pointerType === "touch") return;
      setHoverPin((current) => (current === index ? null : current));
    }, []);

    const onPinKey = React.useCallback(
      (index: number, event: React.KeyboardEvent) => {
        const total = live.current.vectors.length;
        if (event.altKey || event.ctrlKey || event.metaKey || total === 0) return;
        let next: number;
        if (event.key === "ArrowRight") next = (index + 1) % total;
        else if (event.key === "ArrowLeft") next = (index - 1 + total) % total;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = total - 1;
        else return;
        event.preventDefault();
        go(next);
        pinRefs.current[next]?.focus({ preventScroll: true });
      },
      [go],
    );

    const onPinPress = React.useCallback(
      (index: number) => {
        const s = live.current;
        if (s.moved) {
          s.moved = false;
          return;
        }
        if (s.pinnedNow && s.featured === index) {
          setPinned(false);
          return;
        }
        select(index);
        setPinned(true);
        turnTo(index, false);
      },
      [select, turnTo],
    );

    const onPinFocus = React.useCallback(
      (index: number, targetEl: HTMLElement) => {
        if (!targetEl.matches(":focus-visible")) return;
        select(index);
        if ((live.current.depths[index] ?? -1) < 0.55) turnTo(index, false);
      },
      [select, turnTo],
    );

    const beginDrag = (event: React.PointerEvent) => {
      const s = live.current;
      s.dragging = true;
      s.interacting = true;
      s.turn = null;
      event.currentTarget.setPointerCapture(event.pointerId);
      setInteracting(true);
      kick();
    };

    const endDrag = () => {
      const s = live.current;
      s.dragging = false;
      s.pressed = false;
      s.pointerId = -1;
      kick();
    };

    const tabStop = featured ?? 0;
    const avg = (() => {
      const rated = items.filter((item) => typeof item.rating === "number");
      if (rated.length === 0) return null;
      return (rated.reduce((sum, item) => sum + (item.rating ?? 0), 0) / rated.length).toFixed(1);
    })();
    const locationsCount = new Set(items.map((item) => item.city)).size;
    const shownItem = cards.shown === null ? undefined : items[cards.shown];
    const leavingItem = cards.leaving === null ? undefined : items[cards.leaving];

    return (
      <section
        {...rest}
        ref={setRoot}
        data-slot="testimonial-globe"
        data-layout={wide ? "wide" : "stacked"}
        data-active={featured ?? ""}
        data-paused={pinned ? "true" : "false"}
        data-autoplay={running ? "running" : "held"}
        data-gl={glState}
        aria-labelledby={rest["aria-labelledby"] ?? (heading ? headingId : undefined)}
        className={cx(
          "relative isolate w-full overflow-hidden bg-white text-[#0D1117] border-t border-[#0D1117]/[0.06] py-12 lg:py-20",
          className,
        )}
        onFocus={(event) => {
          onFocus?.(event);
          if ((event.target as HTMLElement).matches(":focus-visible")) setKeyboard(true);
        }}
        onBlur={(event) => {
          onBlur?.(event);
          const next = event.relatedTarget as Node | null;
          if (!next || !event.currentTarget.contains(next)) setKeyboard(false);
        }}
      >
        {/* Subtle ambient radial aura behind the globe */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: wide
              ? "radial-gradient(38% 55% at 28% 50%, rgba(0, 82, 255, 0.05), transparent 72%)"
              : "radial-gradient(65% 38% at 50% 45%, rgba(0, 82, 255, 0.05), transparent 72%)",
          }}
        />

        <div
          ref={stageRef}
          className={cx(
            "relative mx-auto w-full",
            wide ? "grid items-center gap-y-8 py-6" : "flex flex-col items-center gap-6 py-4",
          )}
          style={{
            maxWidth: MAX_CONTENT,
            paddingInline: pad,
            ...(wide
              ? {
                  gridTemplateColumns: `${diameter}px minmax(0, 36rem)`,
                  columnGap,
                  justifyContent: "center",
                }
              : {}),
          }}
        >
          <header
            className={cx(
              "flex min-w-0 flex-col",
              wide
                ? "col-start-2 row-start-1 items-start self-end text-left"
                : "w-full items-center text-center",
            )}
          >
            {eyebrow && (
              <p className="m-0 font-mono text-[10px] uppercase tracking-[0.26em] text-[#0D1117]/45 font-semibold">
                {eyebrow}
              </p>
            )}
            {(headingLight || heading) && (
              <h2
                id={headingId}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="m-0 mt-3 text-balance text-3xl sm:text-5xl tracking-[-0.035em] text-[#0D1117] leading-[1.05]"
              >
                {headingLight && (
                  <span className="font-extralight text-[#0D1117]/55 block">
                    {headingLight}
                  </span>
                )}
                {heading && <span className="font-extrabold block mt-0.5">{heading}</span>}
              </h2>
            )}
            {caption && (
              <p
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="m-0 mt-3 max-w-prose text-pretty text-sm sm:text-base font-light text-[#0D1117]/60"
              >
                {caption}
              </p>
            )}
            <div
              className={cx(
                "flex flex-wrap items-center gap-x-5 gap-y-2",
                wide ? "mt-5 justify-start" : "mt-4 justify-center",
              )}
            >
              <dl className="m-0 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-mono text-[#0D1117]/50">
                <div className="flex items-baseline gap-1.5">
                  <dt className="order-2 uppercase tracking-wider">proyectos</dt>
                  <dd className="order-1 m-0 font-bold tabular-nums text-[#0D1117]">{count}</dd>
                </div>
                {avg !== null && (
                  <>
                    <span aria-hidden="true" className="h-3 w-px bg-[#0D1117]/15" />
                    <div className="flex items-baseline gap-1">
                      <dt className="order-2 uppercase tracking-wider">calificación</dt>
                      <dd className="order-1 m-0 inline-flex items-center gap-1 font-bold tabular-nums text-[#0D1117]">
                        <StarIcon className="w-3.5 h-3.5 self-center text-[#D97706]" />
                        {avg}
                      </dd>
                    </div>
                  </>
                )}
                <span aria-hidden="true" className="h-3 w-px bg-[#0D1117]/15" />
                <div className="flex items-baseline gap-1.5">
                  <dt className="order-2 uppercase tracking-wider">ciudades</dt>
                  <dd className="order-1 m-0 font-bold tabular-nums text-[#0D1117]">
                    {locationsCount}
                  </dd>
                </div>
              </dl>
              {action}
            </div>
          </header>

          {/* 3D WebGL Globe Stage */}
          <div
            ref={globeBoxRef}
            data-globe-box
            className={cx(
              "relative shrink-0 touch-pan-y select-none",
              wide && "col-start-1 row-span-2 row-start-1 self-center",
            )}
            style={{ width: diameter, height: diameter }}
            onPointerDown={(event) => {
              if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
              const s = live.current;
              s.pressed = true;
              s.moved = false;
              s.pointerId = event.pointerId;
              s.pressX = s.lastX = event.clientX;
              s.pressY = event.clientY;
              s.lastMoveAt = event.timeStamp;
              s.moveGap = 0;
              s.velocity = 0;
              if (!(event.target as Element).closest("[data-pin]")) beginDrag(event);
            }}
            onPointerMove={(event) => {
              const s = live.current;
              if (!s.pressed || event.pointerId !== s.pointerId) return;
              if (!s.dragging) {
                if (Math.hypot(event.clientX - s.pressX, event.clientY - s.pressY) < DRAG_SLOP)
                  return;
                s.moved = true;
                beginDrag(event);
              }
              const now = event.timeStamp;
              const delta = ((event.clientX - s.lastX) / Math.max(s.size, 1)) * Math.PI;
              const elapsed = Math.max(now - s.lastMoveAt, 1);
              s.moveGap = elapsed;
              s.lastX = event.clientX;
              s.lastMoveAt = now;
              s.phi += delta;
              s.velocity = (delta / elapsed) * (1000 / 60);
              if (Math.abs(event.clientX - s.pressX) > DRAG_SLOP) s.moved = true;
            }}
            onPointerUp={(event) => {
              const s = live.current;
              if (event.pointerId !== s.pointerId) return;
              if (s.dragging) {
                const grace = Math.min(250, Math.max(RELEASE_GRACE_MS, s.moveGap * 1.5));
                if (event.timeStamp - s.lastMoveAt > grace) s.velocity = 0;
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
              }
              endDrag();
            }}
            onPointerCancel={() => {
              live.current.velocity = 0;
              endDrag();
            }}
            onLostPointerCapture={(event) => {
              if (event.pointerId === live.current.pointerId) endDrag();
            }}
          >
            {glState === "unavailable" && (
              <div
                aria-hidden="true"
                data-globe-fallback
                className="pointer-events-none absolute inset-[10%] overflow-hidden rounded-full border border-[#0D1117]/10 bg-[#F7F7F4]"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-[#0D1117]/15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                >
                  <ellipse cx="50" cy="50" rx="50" ry="14" />
                  <ellipse cx="50" cy="50" rx="50" ry="32" />
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <ellipse cx="50" cy="50" rx="18" ry="50" />
                  <ellipse cx="50" cy="50" rx="36" ry="50" />
                  <line x1="50" y1="0" x2="50" y2="100" />
                </svg>
              </div>
            )}

            <div
              ref={canvasHostRef}
              data-globe
              aria-hidden="true"
              className={cx(
                "absolute inset-0 cursor-grab transition-opacity duration-200 active:cursor-grabbing",
                ready ? "opacity-100" : "opacity-0",
              )}
            />

            <div className="pointer-events-none absolute inset-0">
              {items.map((item, i) => (
                <Pin
                  key={item.id}
                  item={item}
                  index={i}
                  tone={toneOf(item, i)}
                  size={pinSize}
                  label={`${text.pin} ${item.name}, ${item.city}`}
                  featured={i === featured}
                  approaching={target === i}
                  pressed={i === featured && pinned}
                  tabbable={i === tabStop}
                  register={registerPin}
                  onEnter={onPinEnter}
                  onLeave={onPinLeave}
                  onPress={onPinPress}
                  onKey={onPinKey}
                  onFocusPin={onPinFocus}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Card Stage */}
          <div
            className={cx(
              "relative w-full min-w-0",
              wide ? "col-start-2 row-start-2 self-start" : "max-w-md",
            )}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setCardHover(true);
            }}
            onPointerLeave={(event) => {
              if (event.pointerType !== "touch") setCardHover(false);
            }}
          >
            <div
              ref={regionRef}
              data-quote-region
              aria-live={running ? "off" : "polite"}
              aria-atomic="true"
              className="grid touch-pan-y"
              onPointerDown={(event) => {
                if (event.pointerType === "mouse") return;
                swipeRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
              }}
              onPointerUp={(event) => {
                const swipe = swipeRef.current;
                if (!swipe || swipe.id !== event.pointerId) return;
                swipeRef.current = null;
                const dx = event.clientX - swipe.x;
                const dy = event.clientY - swipe.y;
                if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy) * 1.5)
                  step(dx < 0 ? 1 : -1);
              }}
              onPointerCancel={() => {
                swipeRef.current = null;
              }}
            >
              {items.map((item, i) => (
                <QuoteCard
                  key={`sizer-${item.id}`}
                  item={item}
                  index={i}
                  tone={toneOf(item, i)}
                  roomy={roomy}
                  mode="sizer"
                />
              ))}
              {leavingItem && cards.leaving !== null && (
                <QuoteCard
                  key={`leaving-${cards.key}`}
                  ref={leavingRef}
                  item={leavingItem}
                  index={cards.leaving}
                  tone={toneOf(leavingItem, cards.leaving)}
                  roomy={roomy}
                  mode="leaving"
                />
              )}
              {shownItem && cards.shown !== null && (
                <QuoteCard
                  key={`card-${cards.key}`}
                  ref={cardRef}
                  item={shownItem}
                  index={cards.shown}
                  tone={toneOf(shownItem, cards.shown)}
                  roomy={roomy}
                  mode="current"
                />
              )}
            </div>

            {count > 1 && (
              <div
                className={cx(
                  "absolute z-10 flex items-center gap-0.5",
                  roomy ? "right-5 top-6" : "right-3.5 top-3",
                )}
              >
                <button
                  type="button"
                  aria-label={text.previous}
                  className="grid w-7 h-7 place-items-center rounded-full text-[#0D1117]/45 transition-colors hover:bg-[#F7F7F4] hover:text-[#0D1117]"
                  onClick={() => step(-1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="min-w-11 text-center font-mono text-[11px] tabular-nums text-[#0D1117]/45">
                  {featured === null ? "–" : featured + 1} / {count}
                </span>
                <button
                  type="button"
                  aria-label={text.next}
                  className="grid w-7 h-7 place-items-center rounded-full text-[#0D1117]/45 transition-colors hover:bg-[#F7F7F4] hover:text-[#0D1117]"
                  onClick={() => step(1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {wide && (
            <svg
              aria-hidden="true"
              data-leader
              className="pointer-events-none absolute left-0 top-0 z-[95] w-px h-px overflow-visible text-[#0D1117]"
            >
              <g ref={leaderRef} className="opacity-0 transition-opacity duration-200">
                <line
                  ref={lineRef}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                  stroke="#0052FF"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <circle ref={startDotRef} r="2.5" className="fill-[#0052FF]" />
                <circle
                  ref={endDotRef}
                  r="3.5"
                  className="fill-white stroke-[#0052FF]"
                  strokeWidth="1.4"
                />
              </g>
            </svg>
          )}
        </div>
      </section>
    );
  },
);

export const ARXEM_GLOBE_TESTIMONIALS: GlobeTestimonial[] = [
  {
    id: "monterrey",
    quote:
      "El vidrio emplomado de 120×80 cm llegó en su huacal de madera sin un solo rasguño. Aprobamos la verificación de COFEPRIS a la primera.",
    name: "Dr. Alejandro Méndez",
    role: "Director de Imagenología",
    company: "Centro Diagnóstico San Pedro",
    city: "Monterrey",
    country: "MX · NL",
    lat: 25.68,
    lng: -100.31,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 1,
    productTag: "VIDRIO EMPLOMADO 2.4MM PB",
  },
  {
    id: "cdmx",
    quote:
      "La pureza de la lámina de plomo al 99.9% facilitó todo el forrado de muros de nuestra nueva sala de tomografía sin fisuras ni fugas.",
    name: "Arq. Fernanda Villarreal",
    role: "Directora de Obra Hospitalaria",
    company: "Villarreal Arquitectos",
    city: "Ciudad de México",
    country: "MX · CDMX",
    lat: 19.43,
    lng: -99.13,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 2,
    productTag: "LÁMINA DE PLOMO 1/16\"",
  },
  {
    id: "bogota",
    quote:
      "Equipamos tres clínicas odontológicas con mandiles emplomados y película intraoral. La asesoría técnica es inmediata y sin burocracia.",
    name: "Dra. Valeria Restrepo",
    role: "Cirujana Maxilofacial",
    company: "Clínica Dental Andina",
    city: "Bogotá",
    country: "CO",
    lat: 4.71,
    lng: -74.07,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 3,
    productTag: "KIT MANDIL + COLLARÍN 0.5MM",
  },
  {
    id: "madrid",
    quote:
      "La claridad óptica del cristal PbO supera a cualquier visor convencional. Nuestros técnicos operan con visibilidad total y cero fatiga visual.",
    name: "Ing. Carlos Alarcón",
    role: "Físico Médico Jefe",
    company: "Instituto Radiológico Ibérico",
    city: "Madrid",
    country: "ES",
    lat: 40.41,
    lng: -3.7,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 4,
    productTag: "ÓPTICA PBO ALTA DENSIDAD",
  },
  {
    id: "sao-paulo",
    quote:
      "Los chasis con pantalla verde y los lentes emplomados llegaron calibrados y listos para quirófano. Excelente trazabilidad documental.",
    name: "Dr. Henrique Vasconcelos",
    role: "Jefe de Radiología Intervencionista",
    company: "Hospital Paulista",
    city: "São Paulo",
    country: "BR",
    lat: -23.55,
    lng: -46.63,
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 5,
    productTag: "LENTES EMPLOMADOS 0.75MM",
  },
  {
    id: "houston",
    quote:
      "Coordinamos el blindaje completo para una unidad móvil de diagnóstico. Precisión milimétrica en los cortes y entrega en tiempo récord.",
    name: "Ing. Roberto Domínguez",
    role: "Ingeniería Biomédica",
    company: "MedShield Systems",
    city: "Houston",
    country: "US · TX",
    lat: 29.76,
    lng: -95.36,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 1,
    productTag: "BLINDAJE INTEGRAL NOM-229",
  },
  {
    id: "santiago",
    quote:
      "En radiología veterinaria necesitábamos guantes y mandiles ligeros pero con atenuación real de 0.5mm Pb. La calidad de fabricación es impecable.",
    name: "Dra. Camila Errázuriz",
    role: "Directora Médica Veterinaria",
    company: "Centro Imagenológico Austral",
    city: "Santiago",
    country: "CL",
    lat: -33.44,
    lng: -70.66,
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    tone: 3,
    productTag: "PROTECCIÓN VETERINARIA",
  },
];

export default TestimonialGlobe;

