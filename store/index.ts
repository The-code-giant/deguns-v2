import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createModalSlice } from './slices/modal-slice';

interface RootState extends ReturnType<typeof createModalSlice.actions> {
  displayModal: boolean;
  modalView: string | null;
  customMessage: string | null;
}

// Define the base state type
export interface StoreState {}

// Define the base actions type
export interface StoreActions {}

// Combine state and actions
export type Store = StoreState & StoreActions;

// Helper function to create store slices
const createRootSlice = (
  set: (partial: Partial<RootState>, replace?: boolean) => void,
  get: () => RootState
) => ({
  ...createModalSlice.initialState,
  ...createModalSlice.actions(set as any),
  // Add other slices here
});

// Export the store hook
const useStore = create(
    devtools(createRootSlice, {
      name: 'global-store',
    })
  );
export default useStore; 