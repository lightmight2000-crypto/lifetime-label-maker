import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type { LabelData, StickerConfig } from "@/lib/sticker-types";

export interface SavedLabelSet {
  id: string;
  name: string;
  labels: LabelData[];
  config: StickerConfig;
  created_at: string;
}

export async function saveLabels(name: string, labels: LabelData[], config: StickerConfig) {
  const { error } = await supabase
    .from("saved_labels")
    .insert([{ name, labels: labels as unknown as Json, config: config as unknown as Json }]);
  if (error) throw error;
}

export async function loadSavedLabels(): Promise<SavedLabelSet[]> {
  const { data, error } = await supabase
    .from("saved_labels")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    name: row.name as string,
    labels: row.labels as unknown as LabelData[],
    config: row.config as unknown as StickerConfig,
    created_at: row.created_at as string,
  }));
}

export async function deleteSavedLabel(id: string) {
  const { error } = await supabase.from("saved_labels").delete().eq("id", id);
  if (error) throw error;
}
