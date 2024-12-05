import { create } from 'zustand';


interface StoreState {
    activePlaceData: PlaceFullSchema | null;
    setActivePlaceData: (place: PlaceFullSchema) => void;
    getActivePlaceData: () => PlaceFullSchema | null;
}

export const useStore = create<StoreState>((set, get) => ({
    activePlaceData: null,
    setActivePlaceData: (place: PlaceFullSchema) => set({ activePlaceData: place }),
    getActivePlaceData: () => get().activePlaceData,
}));

export default useStore;
