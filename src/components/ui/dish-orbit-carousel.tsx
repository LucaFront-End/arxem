"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/*
 * Dish Orbit Carousel (adapted for ARXEM Radiology & Lead Shielding Showcase):
 * The featured product sits on the left; changing item swings it out over the
 * top on a wide orbit while the next item swings in from the other side.
 * The two-weight title wipes out and back in (thin line from the right, heavy
 * line from the left), the specification card and its coloured badge cross-fade,
 * and a tinted radiation-shielding arc behind the scene turns and takes the
 * product's accent colour. Page scroll drives it: the section pins and each
 * stretch of scroll brings the next product. Arrows, thumbnails, the side pager,
 * arrow keys and swipes jump too.
 */

export type Dish = {
  /** The thin first title line, e.g. "Vidrio Emplomado". */
  title: string
  /** The heavy second title line, e.g. "Francés 10mm". */
  subtitle: string
  /** Product photo (transparent PNG/WebP or white-studio cutout). */
  image: string
  alt?: string
  /** Small line above the title. */
  eyebrow?: string
  /** Two-line label under the thumbnail. Defaults to title + subtitle. */
  label?: string
  rating: number
  chef: string
  /** Sub-headline or norm/price under the main card title. */
  kitchen?: string
  description: string
  likes: number
  ingredients?: string[]
  /** Badge and band colour: hex or rgb(), so the band can morph between items. */
  accent: string
  /** Optional reference to the underlying catalog product ID or route action. */
  productId?: string
  customRoute?: "vidrio-personalizado" | "blindaje-personalizado" | "tienda"
}

export type DishOrbitCarouselProps = {
  dishes: Dish[]
  /** Root height. A definite length: percentages collapse on a host page. */
  height?: string
  /** Optional photo behind the display. Washed by the theme background. */
  backdrop?: string
  /** Scroll on forever: past the last item comes the first again. Set false on multi-section pages so scroll continues down. */
  loop?: boolean
  /** Embedded display face (Outfit, OFL). Pass null to use the host's font. */
  fontSrc?: string | null
  /** Label for the first action button (defaults to "Ver ficha técnica"). */
  playLabel?: string
  /** Label for the second action button (defaults to "Cotizar / Comprar"). */
  orderLabel?: string
  onPlay?: (dish: Dish, index: number) => void
  onOrder?: (dish: Dish, index: number) => void
  onChange?: (index: number) => void
  className?: string
}

// #region carousel
export function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0
  return ((Math.round(i) % n) + n) % n
}

/** Which way to swing when jumping from one item to another: the shorter way round. */
export function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1
  const fwd = (((to - from) % n) + n) % n
  return fwd <= n - fwd ? 1 : -1
}

/** Scroll stretches in the section: one per item change, plus one back round to the first when looping. */
export function scrollSteps(n: number, loop: boolean): number {
  return Math.max(0, loop ? n : n - 1)
}

/** The scroll stretch for item `i` nearest the current one (when looping, item 0 is also the last stretch). */
export function segmentFor(i: number, current: number, n: number, loop: boolean): number {
  return loop && i === 0 && current > n / 2 ? n : i
}

/** First thumbnail shown in the strip window, keeping the current one in view. */
export function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0
  return Math.max(0, Math.min(index - 1, n - visible))
}

/** Title font size so a line of `chars` characters fits `width` px at `em` average glyph width. */
export function fitSize(chars: number, max: number, width: number, em: number): number {
  return Math.min(max, width / (Math.max(1, chars) * em))
}

/**
 * The pastel band: a thick stroke along the orbit circle, tapering at
 * both ends. Angles in degrees, screen space (0 = right, 90 = straight down).
 */
export function arcPath(a0: number, a1: number, cx: number, cy: number, r: number, w: number, steps = 48): string {
  const outer: string[] = []
  const inner: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45)
    const c = Math.cos(a)
    const s = Math.sin(a)
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1))
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1))
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z"
}

/** Where the band rests for each item, as [start, end] angles along the orbit. */
export const ARC_REST = [[50, 98], [46, 124], [60, 126], [40, 100]]
export function arcRest(index: number): number[] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length]
}

/** The band mid-swap: it stretches to trail between the outgoing and incoming item. */
export const ARC_SWEEP = [38, 146]
// #endregion

// The orbit: its pivot sits above the canvas (the .dsh-orbit transform-origin).
const ORBIT_X = 299
const ORBIT_Y = -450
const ORBIT_R = 650
const SCROLL_PER_DISH = 0.85 // stage heights of scroll per item
const SWING = 54 // degrees the item travels round the orbit's pivot
const ITEM = 118 // thumbnail pitch in canvas px
const VISIBLE = 4

const FONT = "'Outfit', 'Geist'"

const CSS =
  ".dsh-trk{position:relative;width:100%}" +
  ".dsh-root{position:sticky;top:0;overflow:hidden;width:100%;background:var(--color-background, #F7F7F4);color:var(--color-foreground, #0D1117);" +
  "font-family:" + FONT + ",ui-sans-serif,system-ui,sans-serif;-webkit-tap-highlight-color:transparent}" +
  ".dsh-root *{box-sizing:border-box}" +
  ".dsh-bd{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;pointer-events:none}" +
  ".dsh-wash{position:absolute;inset:0;background:color-mix(in oklab,var(--color-background, #F7F7F4) 38%,transparent);pointer-events:none}" +
  ".dsh-dim{position:absolute;inset:0;background:var(--color-background, #F7F7F4);mix-blend-mode:multiply;opacity:.72;pointer-events:none}" +
  ".dsh-root:focus-visible{outline:2px solid var(--color-primary, #0052FF);outline-offset:-4px}" +
  ".dsh-canvas{position:absolute;left:50%;top:50%;width:960px;height:520px;transform:translate(-50%,-50%) scale(var(--dsh-s,1));transform-origin:50% 50%}" +
  ".dsh-arc{position:absolute;left:0;top:0;width:960px;height:520px;overflow:visible;pointer-events:none}" +
  ".dsh-btn{appearance:none;border:0;background:none;color:inherit;font:inherit;padding:0;margin:0;cursor:pointer}" +
  ".dsh-btn:focus-visible{outline:2px solid var(--color-primary, #0052FF);outline-offset:3px;border-radius:10px}" +
  ".dsh-ico{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}" +
  ".dsh-top{position:absolute;left:785px;top:56px;display:flex;align-items:center;gap:10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;opacity:.45}" +
  ".dsh-pager{position:absolute;left:76px;top:172px;display:flex;flex-direction:column;align-items:center;gap:7px}" +
  ".dsh-dot{width:14px;height:10px;display:grid;place-items:center}" +
  ".dsh-dot i{display:block;width:3px;height:3px;border-radius:3px;background:var(--color-foreground, #0D1117);opacity:.35;transition:height .45s cubic-bezier(.3,.7,.2,1),opacity .3s}" +
  ".dsh-dot[aria-current] i{height:22px;opacity:.9}" +
  ".dsh-dot[aria-current]{height:26px}" +
  ".dsh-dot{transition:height .45s cubic-bezier(.3,.7,.2,1)}" +
  ".dsh-plates{position:absolute;left:130px;top:82px;width:245px;height:245px;touch-action:pan-y}" +
  ".dsh-orbit{position:absolute;inset:0;transform-origin:69% -217%;visibility:hidden;will-change:transform}" +
  ".dsh-orbit>img{display:block;width:245px;height:245px;max-width:none;object-fit:contain;user-select:none;-webkit-user-drag:none;" +
  "filter:drop-shadow(0 18px 24px rgba(0,0,0,.22)) drop-shadow(0 3px 6px rgba(0,0,0,.12))}" +
  ".dsh-head{position:absolute;left:382px;top:96px;width:295px;height:150px}" +
  ".dsh-hd{position:absolute;inset:0;visibility:hidden}" +
  ".dsh-eye{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;opacity:.58;margin:0 0 8px 2px}" +
  ".dsh-t1,.dsh-t2{display:block;white-space:nowrap;line-height:1.02;text-transform:uppercase;margin:0}" +
  ".dsh-t1{font-weight:200;letter-spacing:-.015em;margin-top:6px}" +
  ".dsh-t2{font-weight:800;letter-spacing:-.025em;margin-top:6px;color:color-mix(in oklab,var(--color-foreground, #0D1117) 88%,transparent)}" +
  ".dsh-acts{position:absolute;left:386px;top:276px;display:flex;gap:30px;font-size:12.5px;font-weight:600}" +
  ".dsh-acts .dsh-btn{display:flex;align-items:center;gap:8px;padding:6px 0;transition:opacity .2s}" +
  ".dsh-acts .dsh-btn:hover{opacity:.65}" +
  ".dsh-acts .dsh-ico{width:13px;height:13px}" +
  ".dsh-acts .dsh-fill{fill:currentColor;stroke:none}" +
  ".dsh-card{position:absolute;left:704px;top:106px;width:244px;padding:18px 18px 18px;border-radius:22px;" +
  "background:color-mix(in oklab,var(--color-background, #F7F7F4) 70%,white);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);" +
  "border:1px solid rgba(13,17,23,.07);" +
  "box-shadow:0 1px 0 rgba(255,255,255,.85) inset,0 20px 44px -22px rgba(13,17,23,.18)}" +
  ".dsh-tabs{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:3px;border-radius:11px;background:rgba(13,17,23,.045);font-size:11px;margin-bottom:16px}" +
  ".dsh-tab{color:var(--color-muted-foreground, #525866);font-weight:500;padding:5px 6px;border-radius:8px;text-align:center;transition:all .2s}" +
  ".dsh-tab[aria-selected=true]{color:var(--color-foreground, #0D1117);font-weight:600;background:#fff;box-shadow:0 2px 6px rgba(13,17,23,.08)}" +
  ".dsh-bodies{display:grid}" +
  ".dsh-body{grid-area:1/1;visibility:hidden}" +
  ".dsh-rate{display:flex;align-items:center;gap:12px;margin:0 0 14px 0;padding-bottom:13px;border-bottom:1px solid rgba(13,17,23,.07)}" +
  ".dsh-badge{width:48px;height:48px;border-radius:13px;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;" +
  "box-shadow:0 1px 0 rgba(255,255,255,.5) inset}" +
  ".dsh-badge svg{width:11px;height:11px;fill:var(--color-foreground, #0D1117);opacity:.82}" +
  ".dsh-num{font-size:16px;font-weight:800;letter-spacing:-.03em;line-height:1;color:var(--color-foreground, #0D1117)}" +
  ".dsh-meta{min-width:0;flex:1}" +
  ".dsh-chef{font-size:15px;font-weight:700;letter-spacing:-.015em;line-height:1.2;margin:0;color:var(--color-foreground, #0D1117)}" +
  ".dsh-kit{font-size:10.5px;line-height:1.35;color:var(--color-muted-foreground, #525866);margin:3px 0 0}" +
  ".dsh-desc{font-size:12px;line-height:1.48;margin:0;min-height:66px;color:color-mix(in oklab,var(--color-foreground, #0D1117) 80%,transparent)}" +
  ".dsh-ing{display:flex;flex-wrap:wrap;gap:5px;margin:0;padding:0;list-style:none;min-height:66px;align-content:flex-start}" +
  ".dsh-ing li{font-size:10.5px;font-weight:500;padding:4px 9px;border-radius:99px;background:color-mix(in oklab,var(--color-foreground, #0D1117) 7%,transparent)}" +
  ".dsh-react{display:flex;gap:10px;margin-top:14px}" +
  ".dsh-like{width:100%;display:flex;align-items:center;justify-content:center;gap:7px;height:33px;padding:0 12px;border-radius:10px;font-size:11px;font-weight:600;" +
  "background:color-mix(in oklab,var(--color-foreground, #0D1117) 5.5%,transparent);transition:background .25s}" +
  ".dsh-like:hover{background:color-mix(in oklab,var(--color-foreground, #0D1117) 9%,transparent)}" +
  ".dsh-meh{width:34px;height:34px;display:grid;place-items:center;border-radius:99px;background:color-mix(in oklab,var(--color-foreground, #0D1117) 6%,transparent)}" +
  ".dsh-react .dsh-ico{width:14px;height:14px}" +
  ".dsh-react [aria-pressed=true] .dsh-ico{fill:currentColor}" +
  ".dsh-strip{position:absolute;left:130px;top:362px;width:550px;height:122px;display:flex;align-items:center}" +
  ".dsh-arrow{width:36px;height:36px;display:grid;place-items:center;flex:none;opacity:.55;transition:opacity .2s}" +
  ".dsh-arrow:hover{opacity:1}" +
  ".dsh-arrow svg{width:12px;height:16px;fill:currentColor}" +
  ".dsh-win{position:relative;width:" + ITEM * VISIBLE + "px;height:122px;overflow:hidden;flex:none;margin:0 2px;" +
  "-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}" +
  ".dsh-track{position:absolute;left:0;top:0;display:flex;transition:transform .6s cubic-bezier(.65,0,.35,1)}" +
  ".dsh-th{width:" + ITEM + "px;height:122px;display:flex;justify-content:center;padding-top:3px}" +
  ".dsh-th .dsh-btn{width:84px;height:116px;border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:7px;padding-top:9px;transition:background .45s}" +
  ".dsh-th .dsh-btn[aria-current]{background:color-mix(in oklab,var(--color-background, #F7F7F4) 65%,white);box-shadow:0 10px 24px -16px rgba(13,17,23,.28)}" +
  ".dsh-th img{width:56px;height:56px;max-width:none;object-fit:contain;filter:drop-shadow(0 4px 6px rgba(0,0,0,.18));transition:transform .45s}" +
  ".dsh-th .dsh-btn[aria-current] img{transform:scale(1.06)}" +
  ".dsh-th span{font-size:10px;line-height:1.25;text-align:center;font-weight:500;color:color-mix(in oklab,var(--color-foreground, #0D1117) 78%,transparent);max-width:80px}" +
  ".dsh-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}" +
  "@media (max-width:639px){" +
  ".dsh-canvas{position:relative;left:auto;top:auto;width:100%;height:auto;transform:none;display:flex;flex-direction:column;align-items:center;padding:14px 16px 18px}" +
  ".dsh-arc{width:200%;height:auto;left:-60%;top:-30px}" +
  ".dsh-top{position:relative;left:auto;top:auto;align-self:flex-end}" +
  ".dsh-pager{left:14px;top:150px}" +
  ".dsh-plates{position:relative;left:auto;top:auto;width:min(52vw,32svh);height:min(52vw,32svh);margin-top:0}" +
  ".dsh-orbit>img{width:100%;height:100%}" +
  ".dsh-head{position:relative;left:auto;top:auto;width:100%;height:132px;margin-top:10px}" +
  ".dsh-hd{text-align:center;transform:scale(.78);transform-origin:50% 0}" +
  ".dsh-acts{position:relative;left:auto;top:auto;margin-top:4px}" +
  ".dsh-card{position:relative;left:auto;top:auto;width:100%;max-width:420px;margin-top:12px}" +
  ".dsh-strip{display:none}" +
  "}"

const HIDE_1 = "inset(0% 0% 0% 100%)" // thin line: wipes in from the right
const HIDE_2 = "inset(0% 100% 0% 0%)" // heavy line: wipes in from the left
const SHOW = "inset(0% 0% 0% 0%)"

const Icon = {
  play: (
    <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  ),
  order: (
    <svg className="dsh-ico dsh-fill" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 4 7v6c0 5 3.4 9.4 8 10.5 4.6-1.1 8-5.5 8-10.5V7l-8-4z" />
    </svg>
  ),
  up: (
    <svg className="dsh-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 10v10H3.5V10zM7 10l4-7c1.6 0 2.6 1.2 2.2 2.8L12.6 9H19a2 2 0 0 1 2 2.3l-1.3 7A2 2 0 0 1 17.7 20H7" />
    </svg>
  ),
}

export function DishOrbitCarousel({
  dishes,
  height = "100svh",
  backdrop,
  loop = false,
  fontSrc = null,
  playLabel = "Ver producto",
  orderLabel = "Cotizar / Comprar",
  onPlay,
  onOrder,
  onChange,
  className,
}: DishOrbitCarouselProps) {
  const n = dishes.length
  const [index, setIndex] = useState(0)
  const [tab, setTab] = useState("overview")
  const [liked, setLiked] = useState({} as Record<number, boolean>)

  const trackRef = useRef(null as HTMLDivElement | null)
  const rootRef = useRef(null as HTMLDivElement | null)
  const stRef = useRef(null as ScrollTrigger | null)
  const segRef = useRef(0)
  const indexRef = useRef(0)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const orbits = useRef([] as (HTMLDivElement | null)[])
  const heads = useRef([] as (HTMLDivElement | null)[])
  const bodies = useRef([] as (HTMLDivElement | null)[])
  const actsRef = useRef(null as HTMLDivElement | null)
  const cardRef = useRef(null as HTMLDivElement | null)
  const topCountRef = useRef(null as HTMLDivElement | null)
  const arcRef = useRef(null as SVGPathElement | null)
  const arc = useRef({ a0: 0, a1: 0 })
  const shown = useRef(-1)
  const dirRef = useRef(1 as 1 | -1)
  const tlRef = useRef(null as gsap.core.Timeline | null)
  const swipe = useRef(null as { x: number; y: number } | null)
  const dishesRef = useRef(dishes)
  dishesRef.current = dishes

  // Fit the 960 x 520 design canvas to the root. Measured on resize only.
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const fit = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      el.style.setProperty("--dsh-s", String(Math.min(w / 960, h / 520, 1.45)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The swap. Every item is in the DOM; GSAP orchestrates a smooth full-stage exit followed by a smooth full-stage entrance.
  useLayoutEffect(() => {
    const from = shown.current
    const to = index
    if (from !== -1 && from === to) return

    const parts = (i: number) => {
      const head = heads.current[i]
      return {
        orbit: orbits.current[i],
        head,
        eye: head && head.querySelector(".dsh-eye"),
        t1: head && head.querySelector(".dsh-t1"),
        t2: head && head.querySelector(".dsh-t2"),
        body: bodies.current[i],
      }
    }
    const drawArc = () =>
      arcRef.current?.setAttribute("d", arcPath(arc.current.a0, arc.current.a1, ORBIT_X, ORBIT_Y, ORBIT_R, 118))
    const rest = arcRest(to)
    const currentDishes = dishesRef.current
    const tint = currentDishes[to] ? currentDishes[to].accent : "transparent"
    if (tlRef.current) tlRef.current.progress(1).kill()
    const b = parts(to)
    if (from === -1) {
      for (let i = 0; i < n; i++)
        if (i !== to) {
          const p = parts(i)
          gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 })
        }
      gsap.set([b.orbit, b.head, b.body, b.eye], { autoAlpha: 1, rotation: 0, y: 0, x: 0, scale: 1 })
      gsap.set(b.t1, { clipPath: SHOW, x: 0, autoAlpha: 1 })
      gsap.set(b.t2, { clipPath: SHOW, x: 0, autoAlpha: 1 })
      if (actsRef.current) gsap.set(actsRef.current, { autoAlpha: 1, y: 0 })
      if (cardRef.current) gsap.set(cardRef.current, { autoAlpha: 1, y: 0, x: 0, scale: 1 })
      if (topCountRef.current) gsap.set(topCountRef.current, { autoAlpha: 0.45, y: 0 })
      arc.current.a0 = rest[0]
      arc.current.a1 = rest[1]
      drawArc()
      if (arcRef.current) gsap.set(arcRef.current, { fill: tint })
      shown.current = to
      return
    }
    const a = parts(from)
    const d = dirRef.current
    const tl = gsap.timeline({
      onComplete: () => {
        tlRef.current = null
      },
    })
    tlRef.current = tl

    // Hide any non-participating items immediately and prepare incoming elements hidden
    for (let i = 0; i < n; i++) {
      if (i !== from && i !== to) {
        const p = parts(i)
        gsap.set([p.orbit, p.head, p.body], { autoAlpha: 0 })
      }
    }
    gsap.set(b.orbit, { autoAlpha: 0, rotation: -SWING * d, scale: 0.84 })
    gsap.set(b.head, { autoAlpha: 0 })
    gsap.set(b.eye, { autoAlpha: 0, y: 16 })
    gsap.set(b.t1, { clipPath: HIDE_1, x: -28 * d, autoAlpha: 0 })
    gsap.set(b.t2, { clipPath: HIDE_2, x: 28 * d, autoAlpha: 0 })
    gsap.set(b.body, { autoAlpha: 0, y: 0 })
    if (b.body) gsap.set(b.body.children, { autoAlpha: 0, y: 16 })

    // ─── PHASE 1: SMOOTH FULL-STAGE EXIT OF OUTGOING SLIDE (0.00s → 0.44s) ───
    // 1. Outgoing product swings out along the orbit, scales down slightly, and fades out
    tl.to(
      a.orbit,
      { rotation: SWING * d, scale: 0.84, autoAlpha: 0, duration: 0.44, ease: "power2.in" },
      0
    ).set(a.orbit, { rotation: 0, scale: 1 }, 0.45)

    // 2. Outgoing eyebrow & two-weight title lines glide and wipe out
    tl.to(a.eye, { autoAlpha: 0, y: -14, duration: 0.30, ease: "power2.in" }, 0)
      .to(a.t1, { clipPath: HIDE_1, x: 26 * d, autoAlpha: 0, duration: 0.36, ease: "power2.in" }, 0.02)
      .to(a.t2, { clipPath: HIDE_2, x: -26 * d, autoAlpha: 0, duration: 0.36, ease: "power2.in" }, 0.05)
      .set(a.head, { autoAlpha: 0 }, 0.43)

    // 3. Action buttons slide down and fade out
    if (actsRef.current) {
      tl.to(actsRef.current, { autoAlpha: 0, y: 18, duration: 0.32, ease: "power2.in" }, 0.02)
    }

    // 4. Right specification card & its content glide out and fade
    tl.to(a.body, { autoAlpha: 0, y: -14 * d, duration: 0.32, ease: "power2.in" }, 0.02)
    if (cardRef.current) {
      tl.to(
        cardRef.current,
        { autoAlpha: 0, y: -22 * d, x: 18, scale: 0.96, duration: 0.36, ease: "power2.in" },
        0.02
      )
    }

    // 5. Top slide counter fades out
    if (topCountRef.current) {
      tl.to(topCountRef.current, { autoAlpha: 0, y: -10 * d, duration: 0.26, ease: "power2.in" }, 0)
    }

    // ─── PHASE 2: SMOOTH FULL-STAGE ENTRANCE OF INCOMING SLIDE (0.42s → 1.18s) ───
    // 1. Incoming product swings in from the opposite side of the orbit with smooth deceleration
    tl.to(
      b.orbit,
      { autoAlpha: 1, rotation: 0, scale: 1, duration: 0.85, ease: "expo.out" },
      0.42
    )

    // 2. Incoming eyebrow & two-weight title lines wipe and glide in
    tl.set(b.head, { autoAlpha: 1 }, 0.44)
      .to(b.eye, { autoAlpha: 1, y: 0, duration: 0.54, ease: "expo.out" }, 0.45)
      .to(b.t1, { clipPath: SHOW, x: 0, autoAlpha: 1, duration: 0.74, ease: "expo.out" }, 0.48)
      .to(b.t2, { clipPath: SHOW, x: 0, autoAlpha: 1, duration: 0.74, ease: "expo.out" }, 0.53)

    // 3. Action buttons rise smoothly into place
    if (actsRef.current) {
      tl.set(actsRef.current, { y: 20 }, 0.44).to(
        actsRef.current,
        { autoAlpha: 1, y: 0, duration: 0.64, ease: "expo.out" },
        0.54
      )
    }

    // 4. Right specification card & its internal rows glide in with staggered precision
    tl.set(b.body, { autoAlpha: 1, y: 0 }, 0.44)
    if (cardRef.current) {
      tl.set(cardRef.current, { y: 24 * d, x: 18, scale: 0.96 }, 0.44).to(
        cardRef.current,
        { autoAlpha: 1, y: 0, x: 0, scale: 1, duration: 0.74, ease: "expo.out" },
        0.46
      )
    }
    if (b.body) {
      tl.to(
        b.body.children,
        { autoAlpha: 1, y: 0, duration: 0.60, stagger: 0.055, ease: "expo.out" },
        0.51
      )
    }

    // 5. Top slide counter glides back in
    if (topCountRef.current) {
      tl.set(topCountRef.current, { y: 10 * d }, 0.44).to(
        topCountRef.current,
        { autoAlpha: 0.45, y: 0, duration: 0.48, ease: "power2.out" },
        0.46
      )
    }

    // 6. The orbital arc stretches as the old slide leaves and settles into the new slide's span & colour
    tl.to(
      arc.current,
      { a0: ARC_SWEEP[0], a1: ARC_SWEEP[1], duration: 0.44, ease: "power2.in", onUpdate: drawArc },
      0
    ).to(
      arc.current,
      { a0: rest[0], a1: rest[1], duration: 0.82, ease: "expo.out", onUpdate: drawArc },
      0.44
    )
    if (arcRef.current) tl.to(arcRef.current, { fill: tint, duration: 0.92, ease: "power2.inOut" }, 0.12)
    shown.current = to
  }, [index, n])

  useEffect(() => () => {
    tlRef.current?.kill()
  }, [])

  const select = (next: number, dir: 1 | -1) => {
    if (next === indexRef.current) return
    dirRef.current = dir
    indexRef.current = next
    setIndex(next)
    onChangeRef.current?.(next)
  }

  // The page scroll drives the item: the stage pins, one stretch of scroll per item, snapping between them.
  const steps = scrollSteps(n, loop)
  useEffect(() => {
    const track = trackRef.current
    if (!track || steps < 1) return
    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      snap: { snapTo: 1 / steps, duration: { min: 0.25, max: 0.65 }, delay: 0.06, ease: "power2.inOut" },
      onUpdate: (self) => {
        if (loop && self.progress >= 1 && self.direction > 0) {
          segRef.current = 0
          self.scroll(self.start + 1)
          select(0, 1)
          return
        }
        const seg = Math.round(self.progress * steps)
        if (seg === segRef.current) return
        const dir = seg > segRef.current ? 1 : -1
        segRef.current = seg
        select(wrapIndex(seg, n), dir)
      },
    })
    let raf = 0
    const onWheel = (e: WheelEvent) => {
      const y = trigger.scroll()
      if (!loop || e.deltaY >= 0 || y < trigger.start - 1 || y > trigger.start + 1) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        segRef.current = n - 1
        trigger.scroll(trigger.start + ((trigger.end - trigger.start) * (n - 1)) / steps)
        select(n - 1, -1)
      })
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    stRef.current = trigger
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("wheel", onWheel)
      trigger.kill()
      stRef.current = null
    }
  }, [steps, loop, n])

  // Buttons, keys and swipes jump to an item and move the scroll to its stretch, so the two stay in step.
  const go = (to: number, dir?: 1 | -1) => {
    if (n < 2) return
    const next = wrapIndex(to, n)
    if (next === index) return
    const st = stRef.current
    const y = st ? st.scroll() : 0
    if (st && y >= st.start - 1 && y <= st.end + 1) {
      const seg = segmentFor(next, segRef.current, n, loop)
      segRef.current = seg
      st.scroll(st.start + ((st.end - st.start) * seg) / steps)
    }
    select(next, dir ?? stepDirection(index, next, n))
  }
  const step = (d: 1 | -1) => go(index + d, d)

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      step(1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      step(-1)
    }
  }
  const onPointerDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const s = swipe.current
    swipe.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.4) step(dx < 0 ? 1 : -1)
  }

  const start = stripStart(index, n, VISIBLE)
  const dish = dishes[index]

  return (
    <div
      ref={trackRef}
      className={"dsh-trk" + (className ? " " + className : "")}
      style={{ height: "calc(" + height + " * " + (1 + steps * SCROLL_PER_DISH) + ")" }}
    >
      <div
        ref={rootRef}
        className="dsh-root"
        style={{ height }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Líneas Principales ARXEM"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <style>
          {(fontSrc
            ? "@font-face{font-family:" + FONT + ";src:url(" + fontSrc + ") format('woff2');font-weight:100 900;font-display:swap}"
            : "") + CSS}
        </style>
        {backdrop ? <img className="dsh-bd" src={backdrop} alt="" width={1200} height={900} /> : null}
        {backdrop ? <div className="dsh-dim" /> : null}
        {backdrop ? <div className="dsh-wash" /> : null}

        <div className="dsh-canvas">
          <svg className="dsh-arc" viewBox="0 0 960 520" aria-hidden="true">
            <path ref={arcRef} style={{ opacity: 0.34 }} />
          </svg>

          <div ref={topCountRef} className="dsh-top">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>

          <div className="dsh-pager" role="tablist" aria-label="Elegir producto">
            {dishes.map((d, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                className="dsh-btn dsh-dot"
                aria-selected={i === index}
                aria-current={i === index ? "true" : undefined}
                aria-label={d.title + " " + d.subtitle}
                onClick={() => go(i)}
              >
                <i />
              </button>
            ))}
          </div>

          <div
            className="dsh-plates"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (swipe.current = null)}
          >
            {dishes.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  orbits.current[i] = el
                }}
                className="dsh-orbit"
                aria-hidden={i !== index}
              >
                <img src={d.image} alt={d.alt ?? d.title + " " + d.subtitle} width={245} height={245} draggable={false} />
              </div>
            ))}
          </div>

          <div className="dsh-head" aria-live="polite">
            {dishes.map((d, i) => (
              <div
                key={i}
                ref={(el) => {
                  heads.current[i] = el
                }}
                className="dsh-hd"
                aria-hidden={i !== index}
              >
                <p className="dsh-eye">{d.eyebrow ?? "#" + (i + 1) + " Línea Principal ARXEM"}</p>
                <h2 style={{ margin: 0, font: "inherit" }}>
                  <span className="dsh-t1" style={{ fontSize: fitSize(d.title.length, 44, 285, 0.66) + "px" }}>
                    {d.title}
                  </span>
                  <span className="dsh-t2" style={{ fontSize: fitSize(d.subtitle.length, 50, 285, 0.70) + "px" }}>
                    {d.subtitle}
                  </span>
                </h2>
              </div>
            ))}
          </div>

          <div ref={actsRef} className="dsh-acts">
            <button type="button" className="dsh-btn" onClick={() => dish && onPlay?.(dish, index)}>
              {Icon.play}
              {playLabel}
            </button>
            <button type="button" className="dsh-btn" onClick={() => dish && onOrder?.(dish, index)}>
              {Icon.order}
              {orderLabel}
            </button>
          </div>

          <div ref={cardRef} className="dsh-card">
            <div className="dsh-tabs" role="tablist" aria-label="Detalles técnicos">
              {["overview", "ingredients"].map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  className="dsh-btn dsh-tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                >
                  {t === "overview" ? "Resumen" : "Especificaciones"}
                </button>
              ))}
            </div>
            <div className="dsh-bodies">
              {dishes.map((d, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    bodies.current[i] = el
                  }}
                  className="dsh-body"
                  aria-hidden={i !== index}
                >
                  <div className="dsh-rate">
                    <div className="dsh-badge" style={{ background: d.accent }}>
                      <span className="dsh-num" aria-label={"Calificación " + d.rating.toFixed(1) + " de 5"}>
                        {d.rating.toFixed(1)}
                      </span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                      </svg>
                    </div>
                    <div className="dsh-meta">
                      <p className="dsh-chef">{d.chef}</p>
                      <p className="dsh-kit">{d.kitchen ?? " "}</p>
                    </div>
                  </div>
                  {tab === "overview" || !d.ingredients?.length ? (
                    <p className="dsh-desc">{d.description}</p>
                  ) : (
                    <ul className="dsh-ing">
                      {d.ingredients.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                  <div className="dsh-react">
                    <button
                      type="button"
                      className="dsh-btn dsh-like"
                      aria-pressed={!!liked[i]}
                      tabIndex={i === index ? 0 : -1}
                      onClick={() => {
                        setLiked((s) => ({ ...s, [i]: !s[i] }))
                      }}
                    >
                      {Icon.up}
                      {d.likes + (liked[i] ? 1 : 0)} clínicas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dsh-strip">
            <button type="button" className="dsh-btn dsh-arrow" aria-label="Anterior" onClick={() => step(-1)}>
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M11 0v16L0 8z" />
              </svg>
            </button>
            <div className="dsh-win">
              <div className="dsh-track" style={{ transform: "translateX(" + -start * ITEM + "px)" }}>
                {dishes.map((d, i) => (
                  <div key={i} className="dsh-th">
                    <button
                      type="button"
                      className="dsh-btn"
                      aria-current={i === index ? "true" : undefined}
                      onClick={() => go(i)}
                    >
                      <img src={d.image} alt="" width={56} height={56} draggable={false} />
                      <span>{d.label ?? d.title + " " + d.subtitle}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="dsh-btn dsh-arrow" aria-label="Siguiente" onClick={() => step(1)}>
              <svg viewBox="0 0 12 16" aria-hidden="true">
                <path d="M1 0v16l11-8z" />
              </svg>
            </button>
          </div>
        </div>
        <p className="dsh-sr" aria-live="polite">
          {dish ? "Producto " + (index + 1) + " de " + n + ": " + dish.title + " " + dish.subtitle : ""}
        </p>
      </div>
    </div>
  )
}

export default DishOrbitCarousel
