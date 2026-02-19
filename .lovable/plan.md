

# Save/Load Labels with Lovable Cloud

## Overview
Store label configurations in Lovable Cloud (Supabase) so users can save, load, and delete label sets -- no authentication required.

## Database

### Table: `saved_labels`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | Auto-generated |
| name | text | User-given name for the label set |
| labels | jsonb | Array of LabelData objects |
| config | jsonb | StickerConfig object |
| created_at | timestamptz | Auto-set on insert |

RLS will be disabled (or open read/write policies) since no auth is needed.

## New/Modified Files

1. **`src/integrations/supabase/client.ts`** -- Auto-generated Supabase client (via Lovable Cloud setup)

2. **`src/lib/label-storage.ts`** (new)
   - `saveLabels(name, labels, config)` -- inserts into `saved_labels`
   - `loadSavedLabels()` -- fetches all saved label sets ordered by `created_at` desc
   - `deleteSavedLabel(id)` -- deletes a row by id

3. **`src/components/SaveLoadLabels.tsx`** (new)
   - Save button: opens a Dialog with a name input field, saves current labels + config
   - Load button: opens a Dialog listing all saved sets with a "Load" action per row
   - Delete button per saved entry with confirmation
   - Loading/error states with toast notifications
   - Styled to match existing header buttons

4. **`src/pages/Index.tsx`** (modified)
   - Import and render `SaveLoadLabels` in the header area
   - Pass `labels`, `config`, `setLabels`, and `setConfig` as props

## Steps
1. Enable Lovable Cloud on the project
2. Create `saved_labels` table with open RLS policies
3. Create the storage helper functions
4. Build the Save/Load UI component
5. Wire it into the header of the main page

