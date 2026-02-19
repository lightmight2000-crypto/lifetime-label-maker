import { useState, useRef } from "react";
import { Printer, Eye, Tag, Footprints } from "lucide-react";
import StickerSettings from "@/components/StickerSettings";
import LabelForm from "@/components/LabelForm";
import StickerPreview from "@/components/StickerPreview";
import PrintSheet from "@/components/PrintSheet";
import SaveLoadLabels from "@/components/SaveLoadLabels";
import type { StickerConfig, LabelData } from "@/lib/sticker-types";
import { DEFAULT_CONFIG } from "@/lib/sticker-types";

const Index = () => {
  const [config, setConfig] = useState<StickerConfig>(DEFAULT_CONFIG);
  const [labels, setLabels] = useState<LabelData[]>([
    { id: "1", articleCode: "LT-2024", price: "1299", size: "42", quantity: 3 },
  ]);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const totalStickers = labels.reduce((sum, l) => sum + l.quantity, 0);

  const handlePrint = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-sm">
              <Footprints className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-black text-primary-foreground tracking-wide">LIFETIME</h1>
              <p className="text-xs text-primary-foreground/60 font-medium tracking-wider uppercase">Label Printer</p>
            </div>
          </div>
           <div className="flex items-center gap-3">
            <SaveLoadLabels labels={labels} config={config} setLabels={setLabels} setConfig={setConfig} />
            <div className="hidden sm:flex items-center gap-2 bg-navy-light/50 px-3 py-1.5 rounded-sm">
              <Tag className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-primary-foreground">{totalStickers} stickers</span>
            </div>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-sm border border-primary-foreground/20 text-primary-foreground hover:bg-navy-light transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-sm bg-accent text-accent-foreground hover:bg-coral-dark transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Settings + Form */}
          <div className="lg:col-span-2 space-y-6">
            <StickerSettings config={config} onChange={setConfig} />
            <div className="bg-card border border-border rounded-sm p-5">
              <LabelForm labels={labels} onChange={setLabels} />
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-sm p-5">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider mb-4">Live Preview</h3>
              <div className="bg-muted rounded-sm p-4 flex flex-wrap gap-2 justify-center min-h-[120px]">
                {labels.map((label) => (
                  <StickerPreview key={label.id} config={config} label={label} />
                ))}
              </div>
              <div className="mt-3 text-xs text-muted-foreground text-center">
                Showing 1 of each label · Scale: 3x
              </div>
            </div>

            {/* Print Layout Info */}
            <div className="bg-primary rounded-sm p-4 space-y-2">
              <h4 className="font-bold text-primary-foreground text-xs uppercase tracking-wider">Print Layout</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-navy-light/50 rounded-sm px-3 py-2">
                  <span className="text-[10px] text-primary-foreground/60 uppercase font-semibold">Size</span>
                  <p className="text-sm font-mono font-bold text-primary-foreground">{config.width}×{config.height}mm</p>
                </div>
                <div className="bg-navy-light/50 rounded-sm px-3 py-2">
                  <span className="text-[10px] text-primary-foreground/60 uppercase font-semibold">Per Row</span>
                  <p className="text-sm font-mono font-bold text-primary-foreground">{config.columns} stickers</p>
                </div>
                <div className="bg-navy-light/50 rounded-sm px-3 py-2">
                  <span className="text-[10px] text-primary-foreground/60 uppercase font-semibold">Total</span>
                  <p className="text-sm font-mono font-bold text-accent">{totalStickers} labels</p>
                </div>
                <div className="bg-navy-light/50 rounded-sm px-3 py-2">
                  <span className="text-[10px] text-primary-foreground/60 uppercase font-semibold">Rows</span>
                  <p className="text-sm font-mono font-bold text-primary-foreground">{Math.ceil(totalStickers / config.columns)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Preview Section */}
        {showPreview && (
          <div className="mt-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Print Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Hide
              </button>
            </div>
            <div className="bg-card border border-border rounded-sm p-6 overflow-auto" ref={printRef}>
              <PrintSheet config={config} labels={labels} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
