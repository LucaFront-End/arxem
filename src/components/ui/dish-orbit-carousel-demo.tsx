"use client"

import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel"

const DEMO_PRODUCTS: Dish[] = [
  {
    title: "Vidrio Emplomado",
    subtitle: "Francés 10mm",
    eyebrow: "01 · Blindaje Óptico Salas RX y CT",
    image: "/products/orbit-01-vidrio.png",
    rating: 5.0,
    chef: "2.6 mm Pb Cert.",
    kitchen: "Desde $8,944 MXN · NOM-229-SSA1",
    description:
      "Cristal óptico de silicato de plomo importado de Francia con transmisión luminosa superior al 85% para consolas de Tomografía y Rayos X.",
    likes: 184,
    ingredients: ["10 mm espesor", "2.6 mm Pb", "Francia", "Corte a medida", "COFEPRIS"],
    accent: "#93C5FD",
  },
  {
    title: "Lámina de Plomo",
    subtitle: "Pureza 99.9%",
    eyebrow: "02 · Blindaje Estructural Hospitalario",
    image: "/products/orbit-02-lamina.png",
    rating: 4.9,
    chef: "1.0 a 2.0 mm Pb",
    kitchen: "Desde $2,316 MXN · Rollos 1x1m a 1.10x2.10m",
    description:
      "Plomo electrolítico al 99.94% libre de porosidad para muros de tablaroca, puertas blindadas y marcos radiológicos con memoria analítica.",
    likes: 219,
    ingredients: ["99.94% Pureza", "11.34 g/cm³", "1mm / 1.5mm / 2mm", "Muros y puertas"],
    accent: "#FCD34D",
  },
  {
    title: "Chaleco y Faldón",
    subtitle: "Ergonómico Pb",
    eyebrow: "03 · Dosimetría Intervencionismo",
    image: "/products/orbit-03-chaleco.png",
    rating: 4.9,
    chef: "0.50 mm Pb",
    kitchen: "$14,384 MXN · Redistribución Lumbar",
    description:
      "Conjunto de dos piezas con núcleo flexible emplomado y cierre de velcro en nylon clínico que elimina la fatiga vertebral en quirófano.",
    likes: 142,
    ingredients: ["0.5 mm Pb frontal", "0.25 mm espalda", "Nylon lavable", "2 piezas"],
    accent: "#A7F3D0",
  },
]

export default function DishOrbitCarouselDemo() {
  return <DishOrbitCarousel dishes={DEMO_PRODUCTS} loop={false} />
}

