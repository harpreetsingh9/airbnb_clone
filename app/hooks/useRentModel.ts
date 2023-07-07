import { create } from "zustand";

interface RentModelStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentmodel = create<RentModelStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRentmodel;
