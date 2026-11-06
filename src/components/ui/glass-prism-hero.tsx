"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  ARXEM Lead-Glass & X-Ray Radiation Hero (adapted from 21st.dev)    */
/*  A 3D extruded Lead-Glass slab (Vidrio Emplomado) or Prism          */
/*  intercepts an incoming X-Ray radiation beam (120 kVp), refracting  */
/*  the headline inside the glass and attenuating/splitting the        */
/*  radiation across a clinical dosimetry dot grid.                    */
/*  Plain WebGL, zero external WebGL dependencies.                     */
/* ------------------------------------------------------------------ */

export type GlassThicknessPreset = "8mm-china" | "8mm-alemania" | "10mm-francia" | "12mm-ct";
export type GlassShapeMode = "slab" | "prism";
export type BeamSpectrumMode = "xray" | "optical";

export interface GlassPrismHeroProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Headline drawn into the WebGL scene (the lead glass refracts it). Also rendered as a real <h1>. */
  headline: string;
  /** Small pill above the headline. */
  eyebrow?: React.ReactNode;
  /** Supporting line under the lead glass. */
  description?: React.ReactNode;
  /** Buttons or links under the description. */
  actions?: React.ReactNode;
  /** Extra interactive HUD or telemetry bar rendered over the stage. */
  telemetryBar?: React.ReactNode;
  /** Accent for the eyebrow dot and the scroll hint. */
  accent?: string;
  /** Font for the headline. Make sure it is loaded on the page. */
  fontFamily?: string;
  fontWeight?: number;
  /** Turn the glass and attenuate the radiation beam while the page scrolls. */
  scrollRotate?: boolean;
  /** Labels for the scroll hint, or false to hide it. */
  scrollHint?: { rotate: string; back: string } | false;
  /** Lead-glass thickness preset controlling 3D extrusion depth, IOR and attenuation. */
  glassPreset?: GlassThicknessPreset;
  /** Shape of the glass element: 'slab' (Vidrio Emplomado window pane) or 'prism'. */
  shapeMode?: GlassShapeMode;
  /** Spectrum palette: 'xray' (Cherenkov blue/cyan/violet -> amber/emerald safe zone) or 'optical'. */
  beamMode?: BeamSpectrumMode;
  /** Optional dark-room override for the stage ('light' | 'dark' | 'auto'). */
  stageTheme?: "light" | "dark" | "auto";
}

export interface GlassPrismHeroHandle {
  /** Play the X-ray beam intro pulse again. */
  replay: () => void;
}

const NR = 16; // wavelengths / energy bands in the attenuated fan

const FS = `precision highp float;
#define NR ${NR}
uniform vec2 uRes;
uniform float uDpr, uT, uDark, uFade, uTime;
uniform vec3 uBg, uFg;
uniform sampler2D uText;
uniform vec2 uV0, uV1, uV2, uV3;   // 4 vertices for rectangular Lead Glass slab (or 3 when uIsSlab < 0.5)
uniform float uIsSlab;             // 1.0 = Rectangular Vidrio Emplomado, 0.0 = Triangular Prism
uniform float uRound;
uniform vec2 uDepth;               // 3D thickness extrusion (8mm, 10mm, 12mm lead glass)
uniform vec2 uS, uE, uDir0;        // X-Ray tube source, glass entry point, incoming beam direction
uniform vec2 uX[NR];
uniform vec2 uD[NR];
uniform float uOk[NR];
uniform vec3 uC[NR];
uniform vec2 uShift;               // refractive parallax drift
uniform vec2 uC0;                  // glass centre
uniform float uHeadIn, uFanLen;    // intro: incoming X-ray beam length & attenuated fan length
uniform float uPbDensity;          // lead-oxide amber tint factor (0.0 to 1.0)
uniform float uXrayPulse;          // 1.0 = pulsed ionizing X-ray wave modulation

float sdTri(vec2 p, vec2 p0, vec2 p1, vec2 p2){
  vec2 e0=p1-p0, e1=p2-p1, e2=p0-p2, v0=p-p0, v1=p-p1, v2=p-p2;
  vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);
  vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);
  vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
  float s=sign(e0.x*e2.y-e0.y*e2.x);
  vec2 d=min(min(vec2(dot(pq0,pq0),s*(v0.x*e0.y-v0.y*e0.x)),vec2(dot(pq1,pq1),s*(v1.x*e1.y-v1.y*e1.x))),vec2(dot(pq2,pq2),s*(v2.x*e2.y-v2.y*e2.x)));
  return -sqrt(d.x)*sign(d.y);
}

float sdConvexQuad(vec2 p, vec2 p0, vec2 p1, vec2 p2, vec2 p3){
  vec2 e0=p1-p0, e1=p2-p1, e2=p3-p2, e3=p0-p3;
  vec2 v0=p-p0, v1=p-p1, v2=p-p2, v3=p-p3;
  vec2 pq0=v0-e0*clamp(dot(v0,e0)/dot(e0,e0),0.,1.);
  vec2 pq1=v1-e1*clamp(dot(v1,e1)/dot(e1,e1),0.,1.);
  vec2 pq2=v2-e2*clamp(dot(v2,e2)/dot(e2,e2),0.,1.);
  vec2 pq3=v3-e3*clamp(dot(v3,e3)/dot(e3,e3),0.,1.);
  float s=sign(e0.x*e3.y-e0.y*e3.x);
  vec2 d0=vec2(dot(pq0,pq0), s*(v0.x*e0.y-v0.y*e0.x));
  vec2 d1=vec2(dot(pq1,pq1), s*(v1.x*e1.y-v1.y*e1.x));
  vec2 d2=vec2(dot(pq2,pq2), s*(v2.x*e2.y-v2.y*e2.x));
  vec2 d3=vec2(dot(pq3,pq3), s*(v3.x*e3.y-v3.y*e3.x));
  vec2 d=min(min(d0,d1),min(d2,d3));
  return -sqrt(d.x)*sign(d.y);
}

float glassShape(vec2 p){
  if(uIsSlab > 0.5){
    return sdConvexQuad(p, uV0, uV1, uV2, uV3) - uRound;
  }
  return sdTri(p, uV0, uV1, uV2) - uRound;
}

float seg(vec2 p, vec2 a, vec2 b){
  vec2 pa=p-a, ba=b-a;
  float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
  return length(pa-ba*h);
}

/* Clinical dosimetry dot-grid mask */
float dotMask(vec2 p){
  vec2 g=vec2(20.,13.);
  vec2 q=mod(p+vec2(6.,1.)+g*.5,g)-g*.5;
  return 1.-smoothstep(.45,1.15,length(q));
}

vec3 scene(vec2 p){
  vec3 c=uBg;
  c=mix(c,uFg,(uDark>.5?.13:.15)*dotMask(p));
  float t=texture2D(uText,clamp(p/uRes,0.,1.)).a;
  return mix(c,uFg,t*.97);
}

/* Incoming X-Ray ionizing beam + attenuated spectrum fan exiting the Lead Glass */
vec3 beams(vec2 p, out float white){
  vec3 L=vec3(0.);
  white=0.;
  // Incoming high-energy X-ray beam (left of the glass)
  vec2 head=uS+uDir0*uHeadIn;
  float di=seg(p,uS,head);
  float along=dot(p-uS, uDir0);
  // High-frequency X-ray wave packets travelling along the incoming beam
  float wave = uXrayPulse > 0.5 ? (0.82 + 0.18 * sin(along * 0.16 - uTime * 16.0)) : 1.0;
  float wi=(exp(-di*di/2.2)+.24*exp(-di*di/150.))*wave;
  white=wi;
  // Incoming X-ray beam has a crisp Cherenkov cyan-white core
  vec3 inCol = uXrayPulse > 0.5 ? vec3(0.55, 0.82, 1.0) : vec3(1.0);
  L+=inCol*wi*1.15;

  // Focal impact glow where X-ray hits the front face of the Lead Glass
  if(uHeadIn > 40.0){
    float dHit = length(p - uE);
    float hitGlow = exp(-dHit*dHit/180.0) * (0.7 + 0.3*sin(uTime*12.0));
    L += vec3(0.25, 0.65, 1.0) * hitGlow * 0.9;
  }

  // Exiting attenuated spectrum fan (right of the glass)
  for(int i=0;i<NR;i++){
    if(uOk[i]<.5)continue;
    vec2 q=p-uX[i];
    float t=dot(q,uD[i]);
    if(t<0.)continue;
    float d=abs(q.x*uD[i].y-q.y*uD[i].x);
    float w=1.35+t*.024;
    float pulseOut = uXrayPulse > 0.5 ? (0.88 + 0.12 * sin(t * 0.08 - uTime * 9.0 + float(i)*0.4)) : 1.0;
    float f=(exp(-d*d/(w*w))+.25*exp(-d*d/(w*w*16.)))*smoothstep(uFanLen,uFanLen-130.,t)/(1.+t*.0012)*pulseOut;
    L+=uC[i]*f*(2.55/float(NR));
  }
  return L*uFade;
}

/* Rays being absorbed & refracted inside the Lead Glass (PbO matrix) */
vec3 inner(vec2 p){
  vec3 L=vec3(0.);
  if(uFanLen<=0.)return L;
  for(int i=0;i<NR;i++){
    if(uOk[i]<.5)continue;
    float d=seg(p,uE,uX[i]);
    L+=mix(vec3(1., 0.92, 0.75),uC[i],.78)*exp(-d*d/4.2)*(.95/float(NR));
  }
  float de=length(p-uE);
  L+=vec3(0.65, 0.88, 1.0)*exp(-de*de/110.)*.65;
  return L*uFade;
}

void main(){
  vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr;
  float aa=.8/uDpr+.35;
  float dF=glassShape(p);
  // 3D extruded back face and side thickness of the Lead Glass
  float dH=dF;
  for(int k=1;k<=4;k++){
    dH=min(dH,glassShape(p-uDepth*float(k)*.25));
  }

  vec3 col;
  float wb;
  vec3 B=beams(p,wb);
  vec3 outside=scene(p);
  float dm=dotMask(p);
  if(uDark>.5){
    outside+=B*(.24+2.65*dm);
  } else {
    float I=max(B.r,max(B.g,B.b));
    vec3 hue=B/max(I,1e-4);
    hue=mix(hue,vec3(.08, .35, .95),wb/max(I,1e-4)*.75);
    outside=mix(outside,hue*.92,clamp(I*(.36+1.85*dm),0.,.88));
  }

  // Extruded side thickness of the Lead Glass (amber-lead crystal edge look)
  vec3 pbEdgeTint = mix(vec3(0.95, 0.97, 1.0), vec3(1.0, 0.94, 0.82), uPbDensity);
  vec3 side=scene(p-uDepth*.6)*(uDark>.5?.90:.95)*pbEdgeTint+(uDark>.5?.03:-.015);
  if(uDark>.5) side+=B*.28;
  col=mix(side,outside,smoothstep(-aa,aa,dH));

  // Front face of the Lead Glass with refractive headline distortion & bevels
  if(dF<2.){
    float e=1.;
    vec2 g=vec2(glassShape(p+vec2(e,0.))-glassShape(p-vec2(e,0.)),glassShape(p+vec2(0.,e))-glassShape(p-vec2(0.,e)));
    g=g/max(length(g),1e-4);
    float bevel=18.;
    float h=clamp(-dF/bevel,0.,1.);
    float slope=pow(1.-h,1.6);
    vec3 N=normalize(vec3(g*slope*1.4,1.));
    vec2 off=-N.xy*32.-(p-uC0)*.20+uShift;
    // Chromatic dispersion inside high-density lead silicate glass
    vec3 refr=vec3(scene(p+off*0.98).r,scene(p+off*1.06).g,scene(p+off*1.15).b);
    // Warm amber/crystalline tint characteristic of PbO radiation shielding glass
    vec3 leadTintLight = mix(vec3(.95,.97,1.), vec3(1.0, 0.965, 0.89), uPbDensity * 0.85);
    vec3 leadTintDark  = mix(vec3(.88,.92,1.), vec3(0.98, 0.91, 0.78), uPbDensity * 0.85);
    vec3 glass=refr*(uDark>.5?leadTintDark:leadTintLight)+(uDark>.5?.035:.0);

    // Fresnel rim + specular reflection on polished bevels
    float fr=pow(1.-N.z,1.5);
    vec3 Ld=normalize(vec3(-uDir0,.9));
    vec3 H=normalize(Ld+vec3(0.,0.,1.));
    float sp=pow(max(dot(N,H),0.),48.);
    float band=exp(-pow(dot(p-uC0,vec2(.8,-.6))/(length(uV0-uC0)*.26)-.32,2.));
    vec3 iri=.5+.5*cos(6.2831*(dot(p-uC0,vec2(.004,.003))+vec3(0.,.33,.67)));
    glass+=vec3(1.)*(fr*.32+sp*.88+band*(uDark>.5?.06:.035))+iri*fr*(uDark>.5?.15:.09);
    if(uDark<.5) glass-=vec3(fr*.09);

    vec3 IN=inner(p);
    if(uDark>.5){
      glass+=IN;
    } else {
      float I=max(IN.r,max(IN.g,IN.b));
      vec3 hue=IN/max(I,1e-4);
      hue=mix(vec3(.35, .45, .65),hue,clamp((I-min(IN.r,min(IN.g,IN.b)))/max(I,1e-4)*2.2,0.,1.));
      glass=mix(glass,hue*.86,clamp(I*.75,0.,.75));
    }
    col=mix(glass,col,smoothstep(-aa,aa,dF));
  }

  // Architectural wireframe edges: front face, back face, and 3D corner connectors
  vec2 b0=uV0+uDepth, b1=uV1+uDepth, b2=uV2+uDepth, b3=uV3+uDepth;
  vec3 lineC=uDark>.5?vec3(1.):vec3(0.05, 0.08, 0.14);
  float ef=abs(dF);
  float lf=1.-smoothstep(.0,aa*1.6,ef);

  float eb;
  float ec;
  if(uIsSlab > 0.5){
    eb=min(min(seg(p,b0,b1),seg(p,b1,b2)),min(seg(p,b2,b3),seg(p,b3,b0)))-uRound;
    eb=abs(eb);
    ec=min(
      min(seg(p,uV0+normalize(uV0-uC0)*uRound,b0+normalize(uV0-uC0)*uRound),
          seg(p,uV1+normalize(uV1-uC0)*uRound,b1+normalize(uV1-uC0)*uRound)),
      min(seg(p,uV2+normalize(uV2-uC0)*uRound,b2+normalize(uV2-uC0)*uRound),
          seg(p,uV3+normalize(uV3-uC0)*uRound,b3+normalize(uV3-uC0)*uRound))
    );
  } else {
    eb=min(min(seg(p,b0,b1),seg(p,b1,b2)),seg(p,b2,b0))-uRound;
    eb=abs(eb);
    ec=min(
      min(seg(p,uV0+normalize(uV0-uC0)*uRound,b0+normalize(uV0-uC0)*uRound),
          seg(p,uV1+normalize(uV1-uC0)*uRound,b1+normalize(uV1-uC0)*uRound)),
      seg(p,uV2+normalize(uV2-uC0)*uRound,b2+normalize(uV2-uC0)*uRound)
    );
  }
  float lb=1.-smoothstep(0.,aa*1.6,eb);
  float lc=1.-smoothstep(.2,.2+aa*1.6,ec);

  col=mix(col,lineC,lb*(uDark>.5?.18:.16));
  col=mix(col,lineC,lc*(uDark>.5?.25:.20));
  col=mix(col,lineC,lf*(uDark>.5?.58:.48));
  gl_FragColor=vec4(col,1.);
}`;

const VS = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

/* Spectrum generator:
   - 'xray': High-energy Cherenkov cobalt/cyan/violet transitioning to amber/emerald attenuated dosimetry
   - 'optical': Classic full dispersion spectrum */
function buildSpectrumColors(mode: BeamSpectrumMode): Float32Array {
  const lambda = Array.from({ length: NR }, (_, i) => 700 - i * (300 / (NR - 1)));
  if (mode === "xray") {
    const cols: number[] = [];
    for (let i = 0; i < NR; i++) {
      const u = i / (NR - 1); // 0 = top of fan, 1 = bottom of fan
      if (u < 0.35) {
        // High-energy X-ray Cherenkov Cobalt & Cyan
        const k = u / 0.35;
        cols.push(0.05 + 0.15 * k, 0.38 + 0.48 * k, 1.0);
      } else if (u < 0.7) {
        // Safe Attenuated Emerald / Teal Clinical Zone
        const k = (u - 0.35) / 0.35;
        cols.push(0.1 + 0.85 * k, 0.82 - 0.15 * k, 0.9 - 0.75 * k);
      } else {
        // Dosimetry Lead-Oxide Amber / Gold
        const k = (u - 0.7) / 0.3;
        cols.push(0.98, 0.65 - 0.25 * k, 0.12);
      }
    }
    return new Float32Array(cols);
  }

  const g = (x: number, m: number, s: number) => Math.exp(-(((x - m) / s) ** 2));
  return new Float32Array(
    lambda.flatMap((l) => {
      let r = g(l, 610, 55) + 0.35 * g(l, 415, 28),
        gg = g(l, 540, 50);
      const b = g(l, 455, 38),
        blue = g(l, 455, 22);
      r += blue * 0.12;
      gg -= blue * 0.1;
      const m = Math.max(r, gg, b, 1e-3);
      return [(r / m) * 0.9 + 0.1 * r, (gg / m) * 0.9 + 0.1 * gg, b / m];
    })
  );
}

const LAMBDA = Array.from({ length: NR }, (_, i) => 700 - i * (300 / (NR - 1)));
const IOR = LAMBDA.map((l) => 1.33 + 0.03 / (l / 1000) ** 2);

type V2 = [number, number];
const sub = (a: V2, b: V2): V2 => [a[0] - b[0], a[1] - b[1]];
const add = (a: V2, b: V2): V2 => [a[0] + b[0], a[1] + b[1]];
const mul = (a: V2, s: number): V2 => [a[0] * s, a[1] * s];
const dot = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];
const norm = (a: V2): V2 => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return [a[0] / l, a[1] / l];
};

function hitPolygonEdges(o: V2, d: V2, V: V2[], skip: number) {
  const n = V.length;
  let best: { t: number; k: number; p: V2 } | null = null;
  for (let k = 0; k < n; k++) {
    if (k === skip) continue;
    const a = V[k],
      e = sub(V[(k + 1) % n], a),
      den = d[0] * e[1] - d[1] * e[0];
    if (Math.abs(den) < 1e-9) continue;
    const w = sub(a, o),
      t = (w[0] * e[1] - w[1] * e[0]) / den,
      u = (w[0] * d[1] - w[1] * d[0]) / den;
    if (t > 1e-4 && u >= 0 && u <= 1 && (!best || t < best.t)) {
      best = { t, k, p: add(o, mul(d, t)) };
    }
  }
  return best;
}

function outwardPolygon(V: V2[], k: number, C: V2): V2 {
  const n = V.length;
  const a = V[k],
    b = V[(k + 1) % n];
  let normal = norm([b[1] - a[1], -(b[0] - a[0])]);
  if (dot(normal, sub(a, C)) < 0) normal = mul(normal, -1);
  return normal;
}

function refract(d: V2, n: V2, eta: number): V2 | null {
  const ci = -dot(n, d),
    k = 1 - eta * eta * (1 - ci * ci);
  if (k < 0) return null;
  return norm(add(mul(d, eta), mul(n, eta * ci - Math.sqrt(k))));
}

function makeColorReader() {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  return (css: string): [number, number, number] => {
    g.clearRect(0, 0, 1, 1);
    g.fillStyle = "#000";
    g.fillStyle = css;
    g.fillRect(0, 0, 1, 1);
    const d = g.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  };
}

const PRESET_CONFIG: Record<
  GlassThicknessPreset,
  {
    depthScale: number;
    pbDensity: number;
    fanSpread: number;
    angleBias: number;
    widthScale: number;
    heightScale: number;
  }
> = {
  "8mm-china": {
    depthScale: 0.11,
    pbDensity: 0.55,
    fanSpread: 0.9,
    angleBias: -0.28,
    widthScale: 0.66,
    heightScale: 0.94,
  },
  "8mm-alemania": {
    depthScale: 0.16,
    pbDensity: 0.34,
    fanSpread: 1.12,
    angleBias: -0.15,
    widthScale: 0.74,
    heightScale: 0.98,
  },
  "10mm-francia": {
    depthScale: 0.25,
    pbDensity: 0.8,
    fanSpread: 1.32,
    angleBias: -0.03,
    widthScale: 0.84,
    heightScale: 1.04,
  },
  "12mm-ct": {
    depthScale: 0.32,
    pbDensity: 0.95,
    fanSpread: 1.48,
    angleBias: 0.08,
    widthScale: 0.9,
    heightScale: 1.08,
  },
};

export const GlassPrismHero = React.forwardRef<GlassPrismHeroHandle, GlassPrismHeroProps>(
  function GlassPrismHero(
    {
      headline,
      eyebrow,
      description,
      actions,
      telemetryBar,
      accent = "#0052FF",
      fontFamily = "Geist, Syne, ui-sans-serif, system-ui, -apple-system, sans-serif",
      fontWeight = 600,
      scrollRotate = true,
      scrollHint = {
        rotate: "Desliza para rotar el cristal emplomado",
        back: "Subir al emisor de Rayos X",
      },
      glassPreset = "10mm-francia",
      shapeMode = "slab",
      beamMode = "xray",
      stageTheme = "light",
      className = "",
      style,
      ...rest
    },
    ref
  ) {
    const outerRef = React.useRef<HTMLElement>(null);
    const stageRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const copyRef = React.useRef<HTMLDivElement>(null);
    const hintRef = React.useRef<HTMLDivElement>(null);
    const hintLabelRef = React.useRef<HTMLSpanElement>(null);
    const restartRef = React.useRef<() => void>(() => { });
    const [ready, setReady] = React.useState(false);
    const [noGL, setNoGL] = React.useState(false);

    // Keep live refs for interactive props so WebGL updates at 60fps without re-creating the context
    const liveConfigRef = React.useRef({
      glassPreset,
      shapeMode,
      beamMode,
      stageTheme,
    });
    React.useEffect(() => {
      liveConfigRef.current = { glassPreset, shapeMode, beamMode, stageTheme };
    }, [glassPreset, shapeMode, beamMode, stageTheme]);

    React.useImperativeHandle(ref, () => ({ replay: () => restartRef.current() }), []);

    React.useEffect(() => {
      const stage = stageRef.current!,
        cv = canvasRef.current!;
      const gl = cv.getContext("webgl", {
        antialias: false,
        premultipliedAlpha: false,
        alpha: false,
      });
      if (!gl || gl.isContextLost()) {
        setNoGL(true);
        setReady(true);
        return;
      }
      const reduce = false;

      const shader = (type: number, src: string) => {
        const o = gl.createShader(type);
        if (!o) return null;
        gl.shaderSource(o, src);
        gl.compileShader(o);
        if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
          console.warn(gl.getShaderInfoLog(o));
          gl.deleteShader(o);
          return null;
        }
        return o;
      };
      const vs = shader(gl.VERTEX_SHADER, VS),
        fsh = shader(gl.FRAGMENT_SHADER, FS),
        pr = gl.createProgram();
      if (!vs || !fsh || !pr) {
        setNoGL(true);
        setReady(true);
        return;
      }
      gl.attachShader(pr, vs);
      gl.attachShader(pr, fsh);
      gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) {
        setNoGL(true);
        setReady(true);
        return;
      }
      gl.useProgram(pr);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const al = gl.getAttribLocation(pr, "a");
      gl.enableVertexAttribArray(al);
      gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);

      const U: Record<string, WebGLUniformLocation | null> = {};
      [
        "uRes",
        "uDpr",
        "uT",
        "uDark",
        "uFade",
        "uTime",
        "uBg",
        "uFg",
        "uText",
        "uV0",
        "uV1",
        "uV2",
        "uV3",
        "uIsSlab",
        "uRound",
        "uDepth",
        "uS",
        "uE",
        "uDir0",
        "uX",
        "uD",
        "uOk",
        "uC",
        "uShift",
        "uC0",
        "uHeadIn",
        "uFanLen",
        "uPbDensity",
        "uXrayPulse",
      ].forEach((n) => (U[n] = gl.getUniformLocation(pr, n)));

      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(U.uText, 0);

      const readColor = makeColorReader();
      let textBottom = 0,
        W = 0,
        H = 0,
        DPR = 1,
        bg: [number, number, number] = [0.968, 0.968, 0.956],
        fg: [number, number, number] = [0.05, 0.066, 0.09],
        dark = false;

      const readTheme = () => {
        const mode = liveConfigRef.current.stageTheme;
        if (mode === "dark") {
          bg = [0.039, 0.055, 0.082];
          fg = [0.96, 0.97, 0.99];
          dark = true;
          return;
        }
        if (mode === "light") {
          bg = [0.968, 0.968, 0.956];
          fg = [0.05, 0.067, 0.09];
          dark = false;
          return;
        }
        const cs = getComputedStyle(stage);
        bg = readColor(cs.backgroundColor);
        fg = readColor(cs.color);
        dark = 0.2126 * bg[0] + 0.7152 * bg[1] + 0.0722 * bg[2] < 0.5;
      };

      const drawText = () => {
        const c = document.createElement("canvas");
        c.width = W * DPR;
        c.height = H * DPR;
        const g = c.getContext("2d")!;
        g.scale(DPR, DPR);
        const font = (px: number) => `${fontWeight} ${px}px ${fontFamily}`;
        const words = headline.split(/\s+/);
        let size = Math.min(W * 0.08, H * 0.135, 118),
          lines: string[] = [];
        for (; ;) {
          g.font = font(size);
          try {
            (g as any).letterSpacing = `${-size * 0.045}px`;
          } catch { }
          lines = [];
          let cur = "";
          for (const w of words) {
            const t = cur ? cur + " " + w : w;
            if (g.measureText(t).width > W * 0.88 && cur) {
              lines.push(cur);
              cur = w;
            } else cur = t;
          }
          lines.push(cur);
          if (
            (lines.length <= 2 && lines.every((l) => g.measureText(l).width <= W * 0.9)) ||
            size < 26
          )
            break;
          size *= 0.92;
        }
        g.font = font(size);
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = "#fff";
        try {
          (g as any).letterSpacing = `${-size * 0.045}px`;
        } catch { }
        const lh = size * 1.02,
          top = H * 0.26 - ((lines.length - 1) * lh) / 2;
        lines.forEach((l, i) => g.fillText(l, W / 2, top + i * lh));
        textBottom = top + (lines.length - 1) * lh + size * 0.36;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
      };

      const resize = () => {
        const r = stage.getBoundingClientRect();
        W = Math.max(1, Math.round(r.width));
        H = Math.max(1, Math.round(r.height));
        DPR = Math.min(2, window.devicePixelRatio || 1);
        cv.width = W * DPR;
        cv.height = H * DPR;
        gl.viewport(0, 0, cv.width, cv.height);
        drawText();
      };

      let src = 0.32,
        ang = 0,
        tilt: V2 = [0, 0],
        SCR = 0,
        t0 = performance.now(),
        isReady = false,
        readyTimer = 0;
      const mouse = { x: 0.5, y: 0.5, on: false };

      const initialPreset =
        PRESET_CONFIG[liveConfigRef.current.glassPreset] || PRESET_CONFIG["10mm-francia"];
      const smoothPreset = { ...initialPreset };

      /* Solve either the Rectangular Lead-Glass Slab (Vidrio Emplomado) or the Optical Prism */
      const geometry = () => {
        const cfg = liveConfigRef.current;
        const targetMeta = PRESET_CONFIG[cfg.glassPreset] || PRESET_CONFIG["10mm-francia"];
        smoothPreset.depthScale += (targetMeta.depthScale - smoothPreset.depthScale) * 0.08;
        smoothPreset.pbDensity += (targetMeta.pbDensity - smoothPreset.pbDensity) * 0.08;
        smoothPreset.fanSpread += (targetMeta.fanSpread - smoothPreset.fanSpread) * 0.08;
        smoothPreset.angleBias += (targetMeta.angleBias - smoothPreset.angleBias) * 0.08;
        smoothPreset.widthScale += (targetMeta.widthScale - smoothPreset.widthScale) * 0.08;
        smoothPreset.heightScale += (targetMeta.heightScale - smoothPreset.heightScale) * 0.08;

        const presetMeta = smoothPreset;
        const isSlab = cfg.shapeMode === "slab";
        const R = Math.min(W * 0.155, H * 0.22, 205);
        const C: V2 = [
          W * 0.5,
          Math.min(H * 0.54, Math.max(H * 0.44, textBottom + R * 0.66)),
        ];

        if (isSlab) {
          // Rectangular Lead Glass Window Pane (morphs thickness, width & tilt per glass preset)
          const a = ang + presetMeta.angleBias;
          const hw = R * presetMeta.widthScale;
          const hh = R * presetMeta.heightScale;
          const cosA = Math.cos(a),
            sinA = Math.sin(a);
          const rot = (lx: number, ly: number): V2 => [
            C[0] + lx * cosA - ly * sinA,
            C[1] + lx * sinA + ly * cosA,
          ];
          // Counter-clockwise quad vertices
          const V: V2[] = [
            rot(-hw, -hh),
            rot(hw, -hh),
            rot(hw, hh),
            rot(-hw, hh),
          ];
          const rr = Math.max(6, R * 0.055);
          const Vs = V.map((v) => add(C, mul(sub(v, C), 1 - (1.8 * rr) / R)));

          // Incoming X-Ray source on the left
          const S: V2 = [-60, H * src];
          const targetEntry: V2 = rot(-hw * 0.85, -hh * 0.12);
          const d0 = norm(sub(targetEntry, S));
          const h = hitPolygonEdges(S, d0, V, -1);
          const E: V2 = h ? h.p : targetEntry;

          // Refract through the Lead Glass slab and fan out across the exit face (edge 1: V1->V2)
          const X: number[] = [],
            D: number[] = [],
            ok: number[] = [];
          const baseOutDir = norm([cosA * 0.92 + 0.35, sinA * 0.65 + 0.08]);

          for (let i = 0; i < NR; i++) {
            const u = i / (NR - 1); // 0 .. 1 across the 16 energy bands
            // Exit points distributed along the right face of the Lead Glass pane
            const exitLocalY = (-0.38 + u * 0.76) * hh;
            const exitPt = rot(hw * 0.92, exitLocalY);
            // Fan dispersion angle controlled by lead-glass preset & rotation
            const fanAngle =
              Math.atan2(baseOutDir[1], baseOutDir[0]) +
              (u - 0.45) * 0.48 * presetMeta.fanSpread;
            const dir: V2 = [Math.cos(fanAngle), Math.sin(fanAngle)];
            X.push(exitPt[0], exitPt[1]);
            D.push(dir[0], dir[1]);
            ok.push(1);
          }

          return { R, C, Vs, rr, S, d0, E, X, D, ok, isSlab: 1, presetMeta };
        } else {
          // Classic 3-sided Optical Lead Prism with Snell's Law
          const a = ang + 0.4;
          const V = [0, 1, 2].map((k) => {
            const t = a + (k * 2 * Math.PI) / 3;
            return [C[0] + R * Math.sin(t), C[1] - R * Math.cos(t)] as V2;
          });
          const rr = Math.max(4, R * 0.045);
          const Vs = V.map((v) => add(C, mul(sub(v, C), 1 - (2 * rr) / R)));
          // Pad 4th vertex so uniform uV3 is valid
          Vs.push(Vs[2]);

          const S: V2 = [-60, H * src],
            d0 = norm(sub([C[0] - R * 0.4, C[1] - R * 0.2], S));
          const h = hitPolygonEdges(S, d0, V, -1);
          const X: number[] = [],
            D: number[] = [],
            ok: number[] = [];
          for (let i = 0; i < NR; i++) {
            let good = 0,
              x: V2 = [0, 0],
              dir: V2 = [1, 0];
            if (h) {
              let d = refract(d0, outwardPolygon(V, h.k, C), 1 / IOR[i]),
                o = h.p,
                skip = h.k;
              for (let b = 0; b < 4 && d; b++) {
                const g = hitPolygonEdges(o, d, V, skip);
                if (!g) break;
                const N = outwardPolygon(V, g.k, C),
                  t = refract(d, mul(N, -1), IOR[i]);
                if (t) {
                  x = g.p;
                  dir = t;
                  good = 1;
                  break;
                }
                d = norm(sub(d, mul(N, 2 * dot(d, N))));
                o = g.p;
                skip = g.k;
              }
            }
            X.push(...x);
            D.push(...dir);
            ok.push(good);
          }
          return {
            R,
            C,
            Vs,
            rr,
            S,
            d0,
            E: h ? h.p : C,
            X,
            D,
            ok,
            isSlab: 0,
            presetMeta,
          };
        }
      };

      const setCopy = () => {
        if (copyRef.current)
          copyRef.current.style.opacity = isReady ? String(Math.max(0, 1 - SCR * 1.5)) : "";
        if (hintRef.current && hintLabelRef.current && scrollHint) {
          const up = SCR > 0.85;
          hintRef.current.dataset.up = up ? "true" : "false";
          hintLabelRef.current.textContent = up ? scrollHint.back : scrollHint.rotate;
          hintRef.current.style.opacity = isReady
            ? String(up ? 1 : Math.max(0, 1 - SCR * 5))
            : "0";
        }
      };
      const onScroll = () => {
        if (!scrollRotate) return;
        const r = outerRef.current!.getBoundingClientRect();
        SCR = Math.min(1, Math.max(0, -r.top / (window.innerHeight * 0.7)));
        setCopy();
      };

      const restart = () => {
        if (scrollRotate && SCR > 0) outerRef.current?.scrollIntoView({ block: "start" });
        t0 = performance.now();
        isReady = false;
        setReady(false);
        setCopy();
        window.clearTimeout(readyTimer);
        readyTimer = window.setTimeout(
          () => {
            isReady = true;
            setReady(true);
            setCopy();
          },
          reduce ? 0 : 1200
        );
      };
      restartRef.current = restart;

      let raf = 0,
        alive = true,
        visible = true,
        frameNo = 0,
        lastBeamMode: BeamSpectrumMode | null = null;
      const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

      const frame = (now: number) => {
        if (!alive) return;
        raf = requestAnimationFrame(frame);
        if (!visible) return;
        if (frameNo++ % 15 === 0) readTheme();

        if (lastBeamMode !== liveConfigRef.current.beamMode) {
          lastBeamMode = liveConfigRef.current.beamMode;
          gl.uniform3fv(U.uC, buildSpectrumColors(lastBeamMode));
        }

        const t = reduce ? 99 : (now - t0) / 1000;
        const angT = (mouse.on ? (mouse.x - 0.5) * 0.24 : 0) + SCR * 1.25;
        const srcT = mouse.on
          ? 0.2 + Math.min(1, Math.max(0, mouse.y / 0.8)) * 0.3
          : 0.32 + (reduce ? 0 : Math.sin((now / 1000) * 0.45) * 0.04);
        const tiltT: V2 = mouse.on ? [(mouse.x - 0.5) * 18, (mouse.y - 0.5) * 12] : [0, 0];
        ang += (angT - ang) * 0.06;
        src += (srcT - src) * 0.05;
        tilt = [tilt[0] + (tiltT[0] - tilt[0]) * 0.06, tilt[1] + (tiltT[1] - tilt[1]) * 0.06];

        const G = geometry();
        const L0 = Math.hypot(G.E[0] - G.S[0], G.E[1] - G.S[1]);

        gl.uniform2f(U.uRes, W, H);
        gl.uniform1f(U.uDpr, DPR);
        gl.uniform1f(U.uT, t);
        gl.uniform1f(U.uDark, dark ? 1 : 0);
        gl.uniform1f(
          U.uFade,
          (1 - SCR * 0.85) * (reduce ? 1 : 0.96 + 0.04 * Math.sin((now / 1000) * 2.1))
        );
        gl.uniform1f(U.uTime, now / 1000);
        gl.uniform3fv(U.uBg, bg);
        gl.uniform3fv(U.uFg, fg);
        gl.uniform2fv(U.uV0, G.Vs[0]);
        gl.uniform2fv(U.uV1, G.Vs[1]);
        gl.uniform2fv(U.uV2, G.Vs[2]);
        gl.uniform2fv(U.uV3, G.Vs[3]);
        gl.uniform1f(U.uIsSlab, G.isSlab);
        gl.uniform1f(U.uRound, G.rr);
        gl.uniform2f(
          U.uDepth,
          G.R * G.presetMeta.depthScale + tilt[0],
          -G.R * G.presetMeta.depthScale + tilt[1]
        );
        gl.uniform2fv(U.uC0, G.C);
        gl.uniform2fv(U.uS, G.S);
        gl.uniform2fv(U.uE, G.E);
        gl.uniform2fv(U.uDir0, G.d0);
        gl.uniform2fv(U.uX, G.X);
        gl.uniform2fv(U.uD, G.D);
        gl.uniform1fv(U.uOk, G.ok);
        gl.uniform1f(U.uPbDensity, G.presetMeta.pbDensity);
        gl.uniform1f(U.uXrayPulse, liveConfigRef.current.beamMode === "xray" ? 1 : 0);

        const sa = ang + 0.6;
        gl.uniform2f(U.uShift, Math.cos(sa) * G.R * 0.04, Math.sin(sa) * G.R * 0.03);
        gl.uniform1f(U.uHeadIn, L0 * ease(t / 0.85));
        gl.uniform1f(
          U.uFanLen,
          t < 0.85 ? 0 : Math.hypot(W, H) * 1.2 * ease((t - 0.85) / 1.35) + 120
        );
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        mouse.x = (e.clientX - r.left) / r.width;
        mouse.y = (e.clientY - r.top) / r.height;
        mouse.on = true;
      };
      const leave = () => {
        mouse.on = false;
      };
      let rt = 0;
      const ro = new ResizeObserver(() => {
        window.clearTimeout(rt);
        rt = window.setTimeout(resize, 120);
      });
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
      });
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);
      window.addEventListener("scroll", onScroll, { passive: true, capture: true });

      const fontReady = document.fonts?.load
        ? document.fonts.load(`${fontWeight} 100px ${fontFamily}`).catch(() => [])
        : Promise.resolve([]);
      fontReady.then(() => {
        if (!alive) return;
        readTheme();
        resize();
        onScroll();
        restart();
        ro.observe(stage);
        io.observe(stage);
        raf = requestAnimationFrame(frame);
      });

      return () => {
        alive = false;
        cancelAnimationFrame(raf);
        window.clearTimeout(readyTimer);
        window.clearTimeout(rt);
        ro.disconnect();
        io.disconnect();
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerleave", leave);
        window.removeEventListener("scroll", onScroll, { capture: true } as any);
        gl.deleteTexture(tex);
        gl.deleteBuffer(buf);
        gl.deleteProgram(pr);
        gl.deleteShader(vs);
        gl.deleteShader(fsh);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headline, fontFamily, fontWeight, scrollRotate]);

    const isDarkStage = stageTheme === "dark";
    const fade = `transition-[opacity,transform] duration-1000 [transition-timing-function:cubic-bezier(.2,.9,.25,1)] ${ready ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
      }`;

    return (
      <section
        ref={outerRef}
        className={`relative w-full ${isDarkStage ? "bg-[#0A0E14] text-white" : "bg-background text-foreground"
          } ${className}`}
        style={{ height: scrollRotate ? "calc(100svh + 75vh)" : undefined, ...style }}
        {...rest}
      >
        <div
          ref={stageRef}
          className={`sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden ${isDarkStage ? "bg-[#0A0E14] text-white" : "bg-background text-foreground"
            }`}
          style={{ fontFamily }}
        >
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

          <h1
            className={
              noGL
                ? "absolute inset-x-0 top-[20vh] m-0 px-5 text-center text-[clamp(38px,7.5vw,108px)] font-semibold leading-none tracking-[-0.05em]"
                : "sr-only"
            }
          >
            {headline}
          </h1>

          <div ref={copyRef} className="pointer-events-none absolute inset-0">
            {eyebrow && (
              <div className={`pointer-events-auto absolute inset-x-0 top-[4.5vh] flex justify-center px-4 ${fade}`}>
                {eyebrow}
              </div>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-[max(9vh,76px)] text-center">
              {telemetryBar && (
                <div className={`pointer-events-auto mb-3 ${fade}`}>{telemetryBar}</div>
              )}
              {description && (
                <div
                  className={`m-0 max-w-[600px] text-[15px] leading-[24px] tracking-[-0.015em] ${isDarkStage ? "text-white/70" : "text-muted-foreground"
                    } ${fade} delay-100`}
                >
                  {description}
                </div>
              )}
              {actions && (
                <div
                  className={`pointer-events-auto mt-5 flex flex-wrap items-center justify-center gap-4 ${fade} delay-200`}
                >
                  {actions}
                </div>
              )}
            </div>
          </div>

          {scrollRotate && scrollHint && (
            <div
              ref={hintRef}
              aria-hidden="true"
              data-up="false"
              className={`group/hint pointer-events-none absolute bottom-[18px] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] opacity-0 transition-opacity duration-700 ${isDarkStage ? "text-white/60" : "text-muted-foreground"
                }`}
            >
              <div className="relative h-[32px] w-[20px] rounded-[10px] border-[1.5px] border-current/35 transition-transform duration-500 group-data-[up=true]/hint:rotate-180">
                <span
                  className="absolute left-1/2 top-[6px] -ml-[1.5px] h-[7px] w-[3px] rounded-sm motion-safe:animate-[prism-wheel_1.8s_cubic-bezier(.6,0,.3,1)_infinite]"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                />
              </div>
              <span ref={hintLabelRef}>{scrollHint.rotate}</span>
            </div>
          )}
          <style>{`@keyframes prism-wheel{0%{transform:translateY(0);opacity:0}20%{opacity:1}70%{transform:translateY(10px);opacity:0}100%{opacity:0}}`}</style>
        </div>
      </section>
    );
  }
);

export default GlassPrismHero;

