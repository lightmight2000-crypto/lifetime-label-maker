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

  // mm to px conversion for print (1mm ≈ 3.78px at 96dpi)
  const mmToPx = 3.78;
  const w = config.width * mmToPx;
  const h = config.height * mmToPx;

  // Group into rows
  const rows: LabelData[][] = [];
  for (let i = 0; i < expandedLabels.length; i += config.columns) {
    rows.push(expandedLabels.slice(i, i + config.columns));
  }

  return (
    <div id="print-area">
      {rows.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: 0 }}>
          {row.map((label, ci) => (
            <div
              key={`${ri}-${ci}`}
              className="flex flex-col items-center justify-between border border-gray-200"
              style={{
                width: `${w}px`,
                height: `${h}px`,
                padding: `${mmToPx * 0.5}px`,
                boxSizing: "border-box",
              }}
            >
              <span
                className="font-black tracking-[0.2em] leading-none"
                style={{ fontSize: `${Math.max(5, h * 0.14)}px`, color: "#000" }}
              >
                {config.shopName}
              </span>
              <Barcode
          value={label.articleCode || "000000"}
          width={Math.max(0.5, w * 0.007)}
          height={Math.max(10, h * 0.25)}
          fontSize={Math.max(7, h * 0.14)}
                displayValue
              />
              <div className="flex items-center justify-between w-full">
                {label.size && (
                  <span style={{ fontSize: `${Math.max(5, h * 0.12)}px`, fontWeight: 600, color: "#000" }}>
                    {label.size}
                  </span>
                )}
                <span style={{ fontSize: `${Math.max(6, h * 0.16)}px`, fontWeight: 900, color: "#000", marginLeft: "auto" }}>
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
