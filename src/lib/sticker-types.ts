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
  width: 38,
  height: 25,
  columns: 1,
  shopName: "AL OUD",
};

export const PRESET_CONFIGS: { name: string; config: Partial<StickerConfig> }[] = [
  { name: "Default (38×25mm, 2 col)", config: { width: 38, height: 25, columns: 2 } },
  { name: "Large (50×25mm, 2 col)", config: { width: 50, height: 25, columns: 2 } },
  { name: "Wide (45×20mm, 2 col)", config: { width: 45, height: 20, columns: 2 } },
  { name: "Small (30×15mm, 3 col)", config: { width: 30, height: 15, columns: 3 } },
];
