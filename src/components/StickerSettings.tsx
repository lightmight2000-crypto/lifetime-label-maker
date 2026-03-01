import { useState } from "react";
import type { StickerConfig } from "@/lib/sticker-types";
import { PRESET_CONFIGS } from "@/lib/sticker-types";
import { Settings2 } from "lucide-react";

interface StickerSettingsProps {
  config: StickerConfig;
  onChange: (config: StickerConfig) => void;
}

const StickerSettings = ({ config, onChange }: StickerSettingsProps) => {
  const [isCustom, setIsCustom] = useState(false);

  const applyPreset = (preset: Partial<StickerConfig>) => {
    onChange({ ...config, ...preset });
    setIsCustom(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <Settings2 className="w-5 h-5 text-accent" />
        <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Sticker Settings</h3>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESET_CONFIGS.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p.config)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              config.width === p.config.width && config.height === p.config.height && config.columns === p.config.columns && !isCustom
                ? "bg-accent text-accent-foreground border-accent shadow-md"
                : "bg-secondary text-secondary-foreground border-border hover:border-accent"
            }`}
          >
            {p.name}
          </button>
        ))}
        <button
          onClick={() => setIsCustom(true)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            isCustom
              ? "bg-accent text-accent-foreground border-accent shadow-md"
              : "bg-secondary text-secondary-foreground border-border hover:border-accent"
          }`}
        >
          Custom
        </button>
      </div>

      {/* Custom Fields */}
      {isCustom && (
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Width (mm)</label>
            <input
              type="number"
              value={config.width}
              onChange={(e) => onChange({ ...config, width: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              min={10}
              max={100}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Height (mm)</label>
            <input
              type="number"
              value={config.height}
              onChange={(e) => onChange({ ...config, height: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 bg-secondary border border-border rounded-sm text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              min={8}
              max={100}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Columns</label>
            <input
              type="number"
              value={config.columns}
              onChange={(e) => onChange({ ...config, columns: Number(e.target.value) })}
              className="w-full mt-1 px-3 py-2 bg-secondary border border-border rounded-sm text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              min={1}
              max={6}
            />
          </div>
        </div>
      )}

      {/* Shop Name */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shop Name</label>
        <input
          type="text"
          value={config.shopName}
          onChange={(e) => onChange({ ...config, shopName: e.target.value })}
          className="w-full mt-1 px-3 py-2 bg-secondary border border-border rounded-sm text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-accent uppercase"
        />
      </div>

      {/* Info */}
      <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-sm">
        Current: <span className="font-mono font-bold text-foreground">{config.width}×{config.height}mm</span> · <span className="font-mono font-bold text-foreground">{config.columns}</span> per row · X-Printer ready
      </div>
    </div>
  );
};

export default StickerSettings;
