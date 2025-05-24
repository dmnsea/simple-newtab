import { Preferences } from '@/types/Preferences';
import { restorePrefs } from '@/utils/prefs';
import { createSlice } from '@reduxjs/toolkit';

const prefs = createSlice({
  name: 'prefs',
  initialState: restorePrefs() as Preferences,
  reducers: {
    switchTheme: (state: Preferences) => {
      state.darkTheme = !state.darkTheme;
    }
  }
})

export const { switchTheme } = prefs.actions;
export default prefs.reducer;