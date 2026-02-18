

# Firebase Integration for Saving Labels

## Overview
Add the ability to save and load label configurations to/from Firebase Firestore. No authentication required -- labels are stored globally and can be loaded by anyone using the app.

## What You'll Need to Provide
- Firebase project config (apiKey, authDomain, projectId, etc.) from your Firebase Console
- A Firestore database created in your Firebase project (in test mode for no-auth access)

## How It Will Work

1. **Save Labels** - A "Save" button lets you name and store the current label set (labels + sticker settings) to Firestore
2. **Load Labels** - A "Load" dialog shows previously saved label sets that you can restore with one click
3. **Delete Saved Labels** - Option to remove saved entries you no longer need

## Technical Details

### New Dependencies
- `firebase` -- Firebase JS SDK

### New/Modified Files

1. **`src/lib/firebase.ts`** (new)
   - Firebase app initialization with your config
   - Firestore instance export

2. **`src/lib/label-storage.ts`** (new)
   - `saveLabels(name, labels, config)` -- saves to Firestore `saved_labels` collection
   - `loadSavedLabels()` -- fetches all saved label sets
   - `deleteSavedLabel(id)` -- removes a saved entry

3. **`src/components/SaveLoadLabels.tsx`** (new)
   - Save button with name input dialog
   - Load button opening a list of saved label sets
   - Delete option per saved entry
   - Uses shadcn Dialog component

4. **`src/pages/Index.tsx`** (modified)
   - Add SaveLoadLabels component to the header area
   - Pass labels, config, and setter functions as props

### Firestore Structure

```text
Collection: saved_labels
  Document (auto-id):
    - name: string
    - labels: LabelData[]
    - config: StickerConfig
    - createdAt: timestamp
```

### Firestore Security Rules
Since no auth is used, Firestore must be in **test mode** (open read/write). You'll set this in your Firebase Console.

## Steps
1. Install `firebase` package
2. Create Firebase config file (you provide the config values)
3. Build the storage helper functions
4. Create the Save/Load UI component
5. Wire it into the main page

