import * as React from "react";
import { ArrowRight, RotateCcw, Sun, Moon } from "lucide-react";
import { GlassPrismHero, type GlassPrismHeroHandle } from "@/components/ui/glass-prism-hero";

export default function GlassPrismHeroDemo() {
  const ref = React.useRef<GlassPrismHeroHandle>(null);
  const [dark, setDark] = React.useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <GlassPrismHero
        ref={ref}
        headline="BLINDAJE"
        accent={dark ? "#7dd3fc" : "#FF3E00"}
        stageTheme={dark ? "dark" : "light"}
        shapeMode="slab"
        beamMode="xray"
        glassPreset="8mm-alemania"
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: dark ? "#7dd3fc" : "#FF3E00" }}
            />
            Vidrio Emplomado ZF3 · Atenuación Rayos X 120 kVp
          </span>
        }
        description="Mueve el cursor para orientar el haz de radiación X hacia el bloque de vidrio emplomado; haz scroll para rotar el cristal de alta densidad PbO y observar la refracción y atenuación sobre la retícula."
        actions={
          <>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition hover:opacity-90"
            >
              Cotizar Vidrio a Medida
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => ref.current?.replay()}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background/70 px-4 text-sm text-foreground backdrop-blur-sm transition hover:bg-muted"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Repetir pulso RX
            </button>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Cambiar tema"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur-sm transition hover:bg-muted"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </>
        }
      />
    </div>
  );
}

