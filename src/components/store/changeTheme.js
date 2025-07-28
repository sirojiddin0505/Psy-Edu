import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dark: true
}
export const darkSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers:{
        changeTheme: (state) => {
            state.dark = !state.dark;
        }
    }
})

export const {changeTheme} = darkSlice.actions

export default darkSlice.reducer; 
// 9860120104622564