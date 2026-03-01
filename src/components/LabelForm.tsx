import { useState } from "react";
import type { LabelData } from "@/lib/sticker-types";
import { Plus, Trash2, Copy } from "lucide-react";

interface LabelFormProps {
  labels: LabelData[];
  onChange: (labels: LabelData[]) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const LabelForm = ({ labels, onChange }: LabelFormProps) => {
  const addLabel = () => {
    onChange([
      ...labels,
      { id: generateId(), articleCode: "", price: "", size: "", quantity: 1 },
    ]);
  };

  const updateLabel = (id: string, field: keyof LabelData, value: string | number) => {
    onChange(labels.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const removeLabel = (id: string) => {
    if (labels.length > 1) {
      onChange(labels.filter((l) => l.id !== id));
    }
  };

  const duplicateLabel = (label: LabelData) => {
    onChange([...labels, { ...label, id: generateId() }]);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">Labels</h3>
        <button
          onClick={addLabel}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-accent text-accent-foreground hover:bg-gold-dark transition-colors shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Label
        </button>
      </div>

      <div className="space-y-2">
        {labels.map((label, i) => (
          <div
            key={label.id}
            className="bg-card border border-border rounded-lg p-3 animate-fade-in"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black bg-accent text-accent-foreground w-5 h-5 flex items-center justify-center rounded-lg">
                {i + 1}
              </span>
              <span className="text-xs font-semibold text-muted-foreground flex-1">Label #{i + 1}</span>
              <button
                onClick={() => duplicateLabel(label)}
                className="p-1 text-muted-foreground hover:text-accent transition-colors"
                title="Duplicate"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => removeLabel(label.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                title="Remove"
                disabled={labels.length === 1}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Article / Barcode
                </label>
                <input
                  type="text"
                  value={label.articleCode}
                  onChange={(e) => updateLabel(label.id, "articleCode", e.target.value)}
                  placeholder="e.g. 123456"
                  className="w-full mt-0.5 px-2 py-1.5 bg-secondary border border-border rounded-lg text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Price (₹)
                </label>
                <input
                  type="text"
                  value={label.price}
                  onChange={(e) => updateLabel(label.id, "price", e.target.value)}
                  placeholder="e.g. 999"
                  className="w-full mt-0.5 px-2 py-1.5 bg-secondary border border-border rounded-lg text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Size
                </label>
                <input
                  type="text"
                  value={label.size}
                  onChange={(e) => updateLabel(label.id, "size", e.target.value)}
                  placeholder="e.g. 42"
                  className="w-full mt-0.5 px-2 py-1.5 bg-secondary border border-border rounded-sm text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Qty
                </label>
                <input
                  type="number"
                  value={label.quantity}
                  onChange={(e) => updateLabel(label.id, "quantity", Math.max(1, Number(e.target.value)))}
                  min={1}
                  max={500}
                  className="w-full mt-0.5 px-2 py-1.5 bg-secondary border border-border rounded-sm text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelForm;
