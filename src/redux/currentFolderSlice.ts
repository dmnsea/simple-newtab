import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const root = {
    id: 0,
    title: 'Root',
  };

const currentFolder = createSlice({
  name: 'currentFolder',
  initialState: [root],
  reducers: {
    switchTo: (state, action: PayloadAction<{id: number, title: string}>) => {
      state.push({id: action.payload.id, title: action.payload.title});
    },
    goBack: (state) => {
      state.pop();
    },
    resetPath: () => [root],
  }
});

export const {switchTo, goBack, resetPath} = currentFolder.actions;
export default currentFolder.reducer;