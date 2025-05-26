import { NewTabEntry, NewTabWebsite } from "@/types/NewTabEntries";
import { PayloadFolder, PayloadWebsite } from "@/types/ReduxPayloadAction";
import { restoreTabEntries } from "@/utils/tabEntries";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sites = createSlice({
  name: "tabEntries",
  initialState: restoreTabEntries(),
  reducers: {
    addWebsite: (state, action: PayloadAction<PayloadWebsite>) => {
      const validTitle = (action.payload.title?.trim().length ?? 0) > 0;
      const nextId = state.length > 0 ? state.slice(-1)[0].id + 1 : 1;
      state.push({
        parent: action.payload.parent,
        id: nextId,
        title: validTitle ? action.payload.title! : "Loading...",
        title_unset: validTitle ? false : true,
        url: action.payload.url!,
        type: "website",
        img: "",
        img_cached: false,
      });
    },
    updateWebsite: (state, action: PayloadAction<PayloadWebsite>) => {
      const site = state.find(
        (entry) => entry.id === action.payload.id
      ) as NewTabWebsite;
      site.parent = action.payload.parent;

      if (action.payload.title) {
        site.title = action.payload.title;
      }
      if (action.payload.url) {
        site.url = action.payload.url;
      }
      if (action.payload.image) {
        site.img = action.payload.image;
        site.img_cached = true;
      }
    },
    addFolder: (state, action: PayloadAction<PayloadFolder>) => {
      state.push({
        parent: action.payload.parent,
        id: state.length + 1,
        title: action.payload.title,
        type: "folder",
      });
    },
    updateFolder: (state, action: PayloadAction<PayloadFolder>) => {
      const folder = state.find((entry) => entry.id === action.payload.id);
      if (folder) {
        folder.title = action.payload.title;
        folder.parent = action.payload.parent;
      }
    },
    removeEntry: (
      state,
      action: PayloadAction<{ id: number; fullDrop?: boolean }>
    ) => {
      const target = state.find((e) => e.id == action.payload.id)!;
      if (target.type == "website") {
        state = state.filter((entry) => entry.id !== action.payload.id);
        return state;
      }
      const copy = JSON.parse(JSON.stringify(state)) as NewTabEntry[];
      if (action.payload.fullDrop) {
        const removeIds = [];
        const queue = [target];

        while(queue.length > 0){
          const current = queue.pop()!;
          removeIds.push(current.id);

          if(current.type == 'folder'){
            const affected = copy.filter(e => e.parent == current.id);
            affected.forEach(e => {
              if(e.type == 'folder'){
                queue.push(e);
              }else{
                removeIds.push(e.id);
              }
            });
          }
        }
      } else {
        const affected = [
          ...copy.filter((entry) => entry.parent == action.payload.id),
        ];
        affected.forEach((item) => (item.parent = target.parent));
      }
      return copy.filter((entry) => entry.id != action.payload.id);
    },
    resetTabEntries: () => [],
    entriesFromFile: (state, action: PayloadAction<NewTabEntry[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  addWebsite,
  updateWebsite,
  addFolder,
  updateFolder,
  removeEntry,
  resetTabEntries,
  entriesFromFile,
} = sites.actions;
export default sites.reducer;
