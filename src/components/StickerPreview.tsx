import Barcode from "./Barcode";
import type { StickerConfig, LabelData } from "@/lib/sticker-types";

interface StickerPreviewProps {
  config: StickerConfig;
  label: LabelData;
  scale?: number;
}

const StickerPreview = ({ config, label, scale = 3 }: StickerPreviewProps) => {
  const w = config.width * scale;
  const h = config.height * scale;

  return (
    <div
      className="bg-card border border-border flex flex-col items-center justify-between overflow-hidden"
      style={{
        width: `${w}px`,
        height: `${h}px`,
        padding: `${scale}px`,
      }}
    >
      <span
        className="font-black tracking-widest text-foreground leading-none"
        style={{ fontSize: `${Math.max(6, h * 0.18)}px` }}
      >
        {config.shopName}
      </span>
      <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
        <Barcode
          value={label.articleCode || "000000"}
          width={Math.max(0.6, w * 0.008)}
          height={Math.max(12, h * 0.35)}
          fontSize={Math.max(5, h * 0.12)}
          displayValue
        />
      </div>
      <div className="flex items-center justify-between w-full">
        {label.size && (
          <span
            className="font-semibold text-foreground"
            style={{ fontSize: `${Math.max(5, h * 0.14)}px` }}
          >
            {label.size}
          </span>
        )}
        <span
          className="font-black text-foreground ml-auto"
          style={{ fontSize: `${Math.max(7, h * 0.2)}px` }}
        >
          Rs.{label.price}/=
        </span>
      </div>
    </div>
  );
};

export default StickerPreview;
