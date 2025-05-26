import { Preferences } from '@/types/Preferences';
import { restorePrefs, defaultPrefs } from '@/utils/prefs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const prefs = createSlice({
  name: 'prefs',
  initialState: restorePrefs() as Preferences,
  reducers: {
    setDarkTheme: (state: Preferences, action: PayloadAction<boolean>) => {
      state.darkTheme = action.payload;
    },
    setDropFolderContent: (state: Preferences, action: PayloadAction<boolean>) => {
      state.dropFolderContent = action.payload;
    },
    resetPreferences: () => defaultPrefs,
    prefsFromFile: (state, action: PayloadAction<Preferences>) => {
      state = action.payload;
      return state;
    } 
  }
})

export const { setDarkTheme, setDropFolderContent, resetPreferences, prefsFromFile } = prefs.actions;
export default prefs.reducer;