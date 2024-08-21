// src/redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name, description } = action.payload;
      const existingProduct = state.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.description = description;
      }
    },
    deleteProduct: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
