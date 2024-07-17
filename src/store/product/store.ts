import { create } from "zustand";
import { produce } from "immer";
export interface Product {
  id: number;
  [key: string]: any;
}

export interface ProductState {
  selectedRows?: number[];
  data?: Product[];
}

export type ProductsState = Record<string, ProductState>;

export interface StoreState {
  products: ProductsState;
  setProductData: (key: string, data: Product[]) => void;
  setSelectedRows: (key: string, rows: number[]) => void;
  getSelectedRows: (key: string) => number[];
}

const useProductStore = create<StoreState>((set, get) => ({
  products: {},
  setProductData: (key, data) =>
    set(
      produce((state: StoreState) => {
        if (!state.products[key]) {
          state.products[key] = { data: [] };
        }
        state.products[key].data = data;
      })
    ),
  setSelectedRows: (key, rows) =>
    set(
      produce((state: StoreState) => {
        if (!state.products[key]) {
          state.products[key] = { selectedRows: [] };
        }
        state.products[key].selectedRows = rows;
      })
    ),
  getSelectedRows: (key) => {
    const state = get();
    return state.products[key]?.selectedRows || [];
  },
}));

export default useProductStore;
