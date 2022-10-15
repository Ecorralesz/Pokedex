import { configureStore } from '@reduxjs/toolkit'
import  loadingScreen  from './slices/loadingScreen.slice'
import userNameSlice from './slices/userName.slice'

export default configureStore({
  reducer: {
    userName: userNameSlice,
    isLoading: loadingScreen
	}
})