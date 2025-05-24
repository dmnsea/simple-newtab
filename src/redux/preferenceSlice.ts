import { Preferences } from '@/types/Preferences';
import { restorePrefs } from '@/utils/prefs';
import { createSlice } from '@reduxjs/toolkit';

const prefs = createSlice({
  name: 'prefs',
  initialState: restorePrefs(),
  reducers: {
    switchTheme: (state: Preferences) => {
      state.darkTheme = !state.darkTheme;
    }
  }
})

export const { switchTheme } = prefs.actions;
export default prefs.reducer;