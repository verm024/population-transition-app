import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "globalSlice",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
