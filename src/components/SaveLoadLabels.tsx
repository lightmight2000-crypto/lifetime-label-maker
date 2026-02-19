import { useState } from "react";
import { Save, FolderOpen, Trash2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { saveLabels, loadSavedLabels, deleteSavedLabel, type SavedLabelSet } from "@/lib/label-storage";
import type { LabelData, StickerConfig } from "@/lib/sticker-types";

interface Props {
  labels: LabelData[];
  config: StickerConfig;
  setLabels: (labels: LabelData[]) => void;
  setConfig: (config: StickerConfig) => void;
}

export default function SaveLoadLabels({ labels, config, setLabels, setConfig }: Props) {
  const [saveOpen, setSaveOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSets, setSavedSets] = useState<SavedLabelSet[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await saveLabels(name.trim(), labels, config);
      toast({ title: "Saved!", description: `"${name.trim()}" saved successfully.` });
      setName("");
      setSaveOpen(false);
    } catch {
      toast({ title: "Error", description: "Failed to save labels.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleOpenLoad = async () => {
    setLoadOpen(true);
    setLoading(true);
    try {
      setSavedSets(await loadSavedLabels());
    } catch {
      toast({ title: "Error", description: "Failed to load saved labels.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = (set: SavedLabelSet) => {
    setLabels(set.labels);
    setConfig(set.config);
    setLoadOpen(false);
    toast({ title: "Loaded!", description: `"${set.name}" loaded.` });
  };

  const handleDelete = async (id: string, labelName: string) => {
    try {
      await deleteSavedLabel(id);
      setSavedSets((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Deleted", description: `"${labelName}" removed.` });
    } catch {
      toast({ title: "Error", description: "Failed to delete.", variant: "destructive" });
    }
  };

  return (
    <>
      {/* Save Dialog */}
      <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-sm border border-primary-foreground/20 text-primary-foreground hover:bg-navy-light transition-colors">
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Label Set</DialogTitle>
            <DialogDescription>Give your label set a name to save it for later.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Input placeholder="Label set name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSave()} />
            <Button onClick={handleSave} disabled={saving || !name.trim()}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Load Dialog */}
      <Dialog open={loadOpen} onOpenChange={setLoadOpen}>
        <DialogTrigger asChild>
          <button onClick={handleOpenLoad} className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-sm border border-primary-foreground/20 text-primary-foreground hover:bg-navy-light transition-colors">
            <FolderOpen className="w-3.5 h-3.5" />
            Load
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Label Set</DialogTitle>
            <DialogDescription>Select a previously saved label set to restore.</DialogDescription>
          </DialogHeader>
          {loading ? (
            <div className="flex justify-center py-6"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
          ) : savedSets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No saved label sets yet.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {savedSets.map((set) => (
                <div key={set.id} className="flex items-center justify-between gap-2 p-3 rounded-md border border-border bg-muted/50">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{set.name}</p>
                    <p className="text-xs text-muted-foreground">{set.labels.length} label(s) · {new Date(set.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button size="sm" variant="secondary" onClick={() => handleLoad(set)}>Load</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(set.id, set.name)}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
