import { configureStore } from "@reduxjs/toolkit";
import sitesReducer from './tabSlice';
import prefsReducer from './preferenceSlice';
import { SavePrefsMiddleware } from '@/utils/prefs';
import { SaveTabEntriesMiddleware } from "@/utils/tabEntries";

const store = configureStore({
  reducer: {
    tabEntries: sitesReducer,
    prefs: prefsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(SavePrefsMiddleware, SaveTabEntriesMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;