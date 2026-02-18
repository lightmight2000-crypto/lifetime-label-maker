import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  fontSize?: number;
  displayValue?: boolean;
}

const Barcode = ({ value, width = 1.2, height = 28, fontSize = 10, displayValue = false }: BarcodeProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && value) {
      try {
        JsBarcode(svgRef.current, value, {
          format: "CODE128",
          width,
          height,
          fontSize,
          displayValue,
          margin: 0,
          background: "transparent",
        });
      } catch (e) {
        console.error("Barcode error:", e);
      }
    }
  }, [value, width, height, fontSize, displayValue]);

  return <svg ref={svgRef} />;
};

export default Barcode;
