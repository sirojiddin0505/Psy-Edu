import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from './changeTheme'

export const store = configureStore({
    reducer:{
        darkMode: darkModeReducer
    }
})