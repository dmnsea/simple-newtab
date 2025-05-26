import {Preferences } from "@/types/Preferences";
import {Action} from "redux";

export const defaultPrefs: Preferences = {
  darkTheme: false,
  dropFolderContent: true,
}

export function restorePrefs(): Preferences {
  const prefsStr = localStorage.getItem("snt-prefs");
  if (prefsStr) {
    return JSON.parse(prefsStr);
  }
  return defaultPrefs;
}

export const SavePrefsMiddleware = (state: {getState: () => unknown}) => (next: (a:unknown) => unknown) => (action: unknown) => {
  const result = next(action);
  if((action as Action).type.startsWith('prefs/')){
    const currentState = state.getState();
    const { prefs } = currentState as {prefs: Preferences}
    localStorage.setItem('snt-prefs', JSON.stringify(prefs));
  }
  return result;
}