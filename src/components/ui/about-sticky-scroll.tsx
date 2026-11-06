"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export interface AboutStickyScrollProps {
  onContactSpecialist?: () => void;
  onExploreCatalog?: () => void;
}

interface StoryChapter {
  id: string;
  number: string;
  label: string;
  titleLight: string;
  titleBold: string;
  description: string;
  statValue: string;
  statLabel: string;
  photo: string;
  photoCaption: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "origen",
    number: "01",
    label: "Trayectoria",
    titleLight: "Más de catorce años",
    titleBold: "hablando el idioma de tu clínica.",
    description:
      "Nacimos en 2012 para simplificar el equipamiento radiológico en México. Sin conmutadores ni intermediarios: trato directo con especialistas técnicos.",
    statValue: "+14 años",
    statLabel: "Equipando hospitales, clínicas y laboratorios",
    photo: "/about/about-01-arquitectura.jpg",
    photoCaption: "01 // Sala de control con visor óptico emplomado",
  },
  {
    id: "certificacion",
    number: "02",
    label: "Precisión",
    titleLight: "Certeza milimétrica",
    titleBold: "ante cada auditoría COFEPRIS.",
    description:
      "Cada placa de vidrio emplomado (≥ 4.8 g/cm³) y cada rollo de plomo electrolítico cuenta con espesor real verificado bajo la norma NOM-229-SSA1.",
    statValue: "99.9% Pb",
    statLabel: "Pureza certificada en blindaje y óptica PbO",
    photo: "/about/about-02-precision.jpg",
    photoCaption: "02 // Cristal óptico PbO y plomo puro calibrado",
  },
  {
    id: "logistica",
    number: "03",
    label: "Cobertura",
    titleLight: "Logística blindada",
    titleBold: "a los 32 estados de la República.",
    description:
      "Fabricamos huacales de madera estructural con suspensión interna para cada cristal a medida, respaldados por facturación CFDI 4.0 inmediata.",
    statValue: "32 estados",
    statLabel: "Envíos protegidos en huacal de ingeniería",
    photo: "/about/about-03-logistica.jpg",
    photoCaption: "03 // Embalaje estructural con absorción de impacto",
  },
];

/* -------------------------------------------------------------------------- */
/*          Minimalist Single-Line Sculptural Background SVG                  */
/* -------------------------------------------------------------------------- */

const MinimalBackgroundSvg: React.FC<{
  chapterIndex: number;
  scrollProgress: number;
}> = ({ chapterIndex, scrollProgress }) => {
  const angle = scrollProgress * 24;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {chapterIndex === 0 && (
          <motion.svg
            key="minimal-svg-0"
            viewBox="0 0 1440 900"
            fill="none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {/* Pure concentric architectural rings */}
            <g transform={`translate(920, 450) rotate(${angle})`}>
              <motion.circle
                r="380"
                stroke="#0D1117"
                strokeOpacity="0.06"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              <motion.circle
                r="260"
                stroke="#0052FF"
                strokeOpacity="0.14"
                strokeWidth="1"
                strokeDasharray="6 10"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.1, ease: "easeOut" }}
              />
              <circle r="3.5" fill="#0052FF" fillOpacity="0.35" cx="-260" cy="0" />
              <circle r="3.5" fill="#0052FF" fillOpacity="0.35" cx="260" cy="0" />
            </g>
          </motion.svg>
        )}

        {chapterIndex === 1 && (
          <motion.svg
            key="minimal-svg-1"
            viewBox="0 0 1440 900"
            fill="none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {/* Single clean optical prism geometry + refracted hairline */}
            <g transform={`translate(920, 450) rotate(${-angle * 0.6})`}>
              <motion.polygon
                points="0,-340 294,-170 294,170 0,340 -294,170 -294,-170"
                stroke="#D97706"
                strokeOpacity="0.16"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
              <polygon
                points="0,-220 190,-110 190,110 0,220 -190,110 -190,-110"
                stroke="#0D1117"
                strokeOpacity="0.05"
                strokeWidth="1"
              />
            </g>
            <motion.path
              d="M 140 520 L 626 450 L 1214 360"
              stroke="#D97706"
              strokeOpacity="0.15"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </motion.svg>
        )}

        {chapterIndex === 2 && (
          <motion.svg
            key="minimal-svg-2"
            viewBox="0 0 1440 900"
            fill="none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            {/* Minimalist architectural frame + sweeping trajectory arc */}
            <g transform="translate(920, 450)">
              <rect
                x="-310"
                y="-310"
                width="620"
                height="620"
                rx="28"
                stroke="#0D1117"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </g>
            <motion.path
              d="M 180 680 Q 640 160 1180 340"
              stroke="#0052FF"
              strokeOpacity="0.16"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
            <circle cx="180" cy="680" r="4" fill="#0052FF" fillOpacity="0.3" />
            <circle cx="1180" cy="340" r="4" fill="#0052FF" fillOpacity="0.3" />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         Main Sticky Scroll Component                       */
/* -------------------------------------------------------------------------- */

export const AboutStickyScroll: React.FC<AboutStickyScrollProps> = ({
  onContactSpecialist,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScrollable = rect.height - vh;

      if (totalScrollable <= 0) return;

      const rawProgress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clamped);

      if (clamped < 0.34) {
        setActiveIndex(0);
      } else if (clamped < 0.68) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (index: number) => {
    const el = containerRef.current;
    if (!el) {
      setActiveIndex(index);
      return;
    }
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;

    if (totalScrollable <= 0) {
      setActiveIndex(index);
      return;
    }

    const targetRatios = [0.06, 0.5, 0.92];
    window.scrollTo({
      top: absoluteTop + totalScrollable * targetRatios[index],
      behavior: "smooth",
    });
  };

  const activeChapter = STORY_CHAPTERS[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F7F7F4] border-t border-[#0D1117]/[0.06] lg:h-[230vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex items-center py-20 lg:py-0">
        {/* Whisper-quiet geometric SVG background */}
        <MinimalBackgroundSvg
          chapterIndex={activeIndex}
          scrollProgress={scrollProgress}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* ===============================================================
                LEFT COLUMN: PURE TYPOGRAPHY & MINIMAL INDEX (Cols 1-6)
            =============================================================== */}
            <div className="lg:col-span-6 space-y-10">
              {/* Minimalist Chapter Rail */}
              <div className="space-y-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#0D1117]/40">
                  07 — SOBRE NOSOTROS
                </div>

                <div className="flex items-center gap-8 border-b border-[#0D1117]/[0.08] pb-3.5">
                  {STORY_CHAPTERS.map((chap, idx) => {
                    const isCurrent = idx === activeIndex;
                    return (
                      <button
                        key={chap.id}
                        type="button"
                        onClick={() => scrollToChapter(idx)}
                        className="group relative flex items-baseline gap-2 text-left py-1"
                      >
                        <span
                          className={`font-mono text-[11px] transition-colors duration-300 ${
                            isCurrent ? "text-[#0052FF] font-semibold" : "text-[#0D1117]/30"
                          }`}
                        >
                          {chap.number}
                        </span>
                        <span
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                          className={`text-sm tracking-tight transition-colors duration-300 ${
                            isCurrent
                              ? "font-extrabold text-[#0D1117]"
                              : "font-light text-[#0D1117]/40 group-hover:text-[#0D1117]/70"
                          }`}
                        >
                          {chap.label}
                        </span>

                        {isCurrent && (
                          <motion.div
                            layoutId="aboutMinimalUnderline"
                            className="absolute -bottom-[15px] left-0 right-0 h-[1.5px] bg-[#0D1117]"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animated Story Copy */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <h2
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-4xl sm:text-5xl xl:text-[54px] tracking-[-0.035em] text-[#0D1117] leading-[1.05]"
                  >
                    <span className="font-extralight text-[#0D1117]/55 block">
                      {activeChapter.titleLight}
                    </span>
                    <span className="font-extrabold block mt-1">
                      {activeChapter.titleBold}
                    </span>
                  </h2>

                  <p
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="text-base sm:text-lg font-light text-[#0D1117]/60 leading-relaxed max-w-lg"
                  >
                    {activeChapter.description}
                  </p>

                  {/* Single Minimalist Typographic Figure + Subtle Action */}
                  <div className="pt-6 border-t border-[#0D1117]/[0.08] flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <div
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em] text-[#0D1117]"
                      >
                        {activeChapter.statValue}
                      </div>
                      <div className="text-xs text-[#0D1117]/45 mt-1">
                        {activeChapter.statLabel}
                      </div>
                    </div>

                    {onContactSpecialist && (
                      <button
                        type="button"
                        onClick={onContactSpecialist}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-extrabold text-[#0D1117] hover:text-[#0052FF] transition-colors pb-1 border-b border-[#0D1117]/25 hover:border-[#0052FF]"
                      >
                        <span>Hablar con nosotros</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ===============================================================
                RIGHT COLUMN: UNCLUTTERED EDITORIAL PHOTOGRAPH (Cols 7-12)
            =============================================================== */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-[520px] lg:max-w-none">
                <div className="relative aspect-[4/4.2] rounded-[24px] overflow-hidden bg-[#EAE8E1]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeChapter.photo}
                      src={activeChapter.photo}
                      alt={activeChapter.titleBold}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                {/* Whisper-quiet caption below the image */}
                <div className="mt-3.5 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] uppercase text-[#0D1117]/40">
                  <span>{activeChapter.photoCaption}</span>
                  <span>{activeChapter.number} / 03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
