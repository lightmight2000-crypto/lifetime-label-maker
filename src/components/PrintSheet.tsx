import type { StickerConfig, LabelData } from "@/lib/sticker-types";
import Barcode from "./Barcode";

interface PrintSheetProps {
  config: StickerConfig;
  labels: LabelData[];
}

const PrintSheet = ({ config, labels }: PrintSheetProps) => {
  // Expand labels by quantity
  const expandedLabels: LabelData[] = [];
  labels.forEach((label) => {
    for (let i = 0; i < label.quantity; i++) {
      expandedLabels.push(label);
    }
  });

  // Use mm units directly for accurate print sizing
  const gapMm = 1; // gap between stickers in mm
  const cols = config.columns;
  const stickerWidthMm = config.width; // use exact configured width
  const stickerHeightMm = config.height;
  const rowWidthMm = cols * stickerWidthMm + (cols - 1) * gapMm;

  // Group into rows
  const rows: LabelData[][] = [];
  for (let i = 0; i < expandedLabels.length; i += cols) {
    rows.push(expandedLabels.slice(i, i + cols));
  }

  return (
    <div id="print-area" style={{ width: `${rowWidthMm}mm` }}>
      {rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            gap: `${gapMm}mm`,
            marginBottom: "0mm",
            breakInside: "avoid",
            pageBreakInside: "avoid",
          }}
        >
          {row.map((label, ci) => (
            <div
              key={`${ri}-${ci}`}
              style={{
                width: `${stickerWidthMm}mm`,
                height: `${stickerHeightMm}mm`,
                padding: "0.5mm",
                boxSizing: "border-box",
                border: "0.2mm solid #ddd",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                className="font-black tracking-[0.15em] leading-none"
                style={{ fontSize: `${Math.max(1.8, stickerHeightMm * 0.15)}mm`, color: "#000", fontFamily: "'Playfair Display', serif" }}
              >
                ✦ {config.shopName} ✦
              </span>
              <Barcode
                value={label.articleCode || "000000"}
                width={Math.max(0.5, stickerWidthMm * 0.03)}
                height={Math.max(10, stickerHeightMm * 1.2)}
                fontSize={Math.max(7, stickerHeightMm * 0.6)}
                displayValue
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                {label.size && (
                  <span style={{ fontSize: `${Math.max(1.5, stickerHeightMm * 0.12)}mm`, fontWeight: 600, color: "#000" }}>
                    {label.size}
                  </span>
                )}
                <span style={{ fontSize: `${Math.max(1.8, stickerHeightMm * 0.16)}mm`, fontWeight: 900, color: "#000", marginLeft: "auto" }}>
                  Rs.{label.price}/=
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PrintSheet;
