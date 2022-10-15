import { createSlice } from '@reduxjs/toolkit';

export const loadingScreen = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
      setIsLoading: (state, action) => {
        const isLoading = action.payload;
        return isLoading;
      }
    }
})

export const { setIsLoading } = loadingScreen.actions;

export default loadingScreen.reducer;
