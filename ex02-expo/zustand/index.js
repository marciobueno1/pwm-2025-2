import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
      clear: () => set({ count: 0 }),
      add: (val) => set((state) => ({ count: state.count + val })),
    }),
    { name: "counter", storage: createJSONStorage(() => AsyncStorage) }
  )
);
