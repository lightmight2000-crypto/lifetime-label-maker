export interface StickerConfig {
  width: number; // mm
  height: number; // mm
  columns: number;
  shopName: string;
}

export interface LabelData {
  id: string;
  articleCode: string;
  price: string;
  size?: string;
  quantity: number;
}

export const DEFAULT_CONFIG: StickerConfig = {
  width: 30,
  height: 15,
  columns: 3,
  shopName: "LIFETIME",
};

export const PRESET_CONFIGS: { name: string; config: Partial<StickerConfig> }[] = [
  { name: "Default (30×15mm, 3 col)", config: { width: 30, height: 15, columns: 3 } },
  { name: "Large (50×25mm, 2 col)", config: { width: 50, height: 25, columns: 2 } },
  { name: "Wide (40×20mm, 2 col)", config: { width: 40, height: 20, columns: 2 } },
  { name: "Small (25×12mm, 4 col)", config: { width: 25, height: 12, columns: 4 } },
];
