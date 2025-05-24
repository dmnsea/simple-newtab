import { NewTabWebsite } from '@/types/NewTabEntries';
import { PayloadFolder, PayloadWebsite } from '@/types/ReduxPayloadAction';
import { restoreTabEntries } from '@/utils/tabEntries';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sites = createSlice({
  name: 'tabEntries',
  initialState: restoreTabEntries(),
  reducers: {
    addWebsite: (state, action: PayloadAction<PayloadWebsite>) => {
      state.push({
        id: state.length + 1,
        title: action.payload.title,
        url: action.payload.url,
        type: 'website'
      });
    },
    updateWebsite: (state, action: PayloadAction<PayloadWebsite>) => {
      const site = state.find(entry => entry.id === action.payload.id) as NewTabWebsite;
      site.title = action.payload.title;
      site.url = action.payload.url;
    },
    addFolder: (state, action: PayloadAction<PayloadFolder>) => {
      state.push({
        id: state.length + 1,
        title: action.payload.title,
        children: [],
        type: 'folder'
      })
    },
    renameFolder: (state, action: PayloadAction<PayloadFolder>) => {
      const folder = state.find(entry => entry.id === action.payload.id);
      if(folder){
        folder.title = action.payload.title;
      }
    },
    removeEntry: (state, action: PayloadAction<number>) => {
      state = state.filter(entry => entry.id !== action.payload);
    },
  }
});

export const { addWebsite, updateWebsite, addFolder, renameFolder, removeEntry } = sites.actions;
export default sites.reducer;