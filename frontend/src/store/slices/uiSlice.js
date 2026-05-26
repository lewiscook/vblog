import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: true,
    sidebarOpen: false,
    mobileNavValue: 0,
  },
  reducers: {
    toggleDarkMode: (state) => { state.darkMode = !state.darkMode },
    setSidebarOpen: (state, action) => { state.sidebarOpen = action.payload },
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    setMobileNavValue: (state, action) => { state.mobileNavValue = action.payload },
  },
})

export const { toggleDarkMode, setSidebarOpen, toggleSidebar, setMobileNavValue } = uiSlice.actions
export default uiSlice.reducer
