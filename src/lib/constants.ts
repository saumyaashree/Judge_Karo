import type { LucideIcon } from "lucide-react";
import { Smartphone, Headphones, Laptop } from "lucide-react";

export const SECTORS = {
  SMARTPHONES: {
    id: "smartphones",
    name: "Smartphones",
    icon: Smartphone,
  },
  EARPHONES: {
    id: "earphones",
    name: "Earphones & Headphones",
    icon: Headphones,
  },
  LAPTOPS: {
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
  },
} as const;

export const SECTOR_IDS = Object.values(SECTORS).map(s => s.id);
