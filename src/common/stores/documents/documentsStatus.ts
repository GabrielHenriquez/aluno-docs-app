import { create } from "zustand";

interface DocumentFlowState {
  updatedDocs: Set<string>;
  markAsUpdated: (id: string) => void;
  reset: () => void;
}

export const useDocumentFlowStore = create<DocumentFlowState>((set) => ({
  updatedDocs: new Set(),
  markAsUpdated: (id) =>
    set((state) => {
      const updated = new Set(state.updatedDocs);
      updated.add(id);
      return { updatedDocs: updated };
    }),
  reset: () => set({ updatedDocs: new Set() }),
}));
