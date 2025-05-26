import { NewTabEntry } from "@/types/NewTabEntries";
import { Action } from "redux";

export function restoreTabEntries(): NewTabEntry[] {
  const entriesStr = localStorage.getItem('snt-entries');
  if(entriesStr){
    const entries = JSON.parse(entriesStr);
    return entries;
  }
  return [];
}

export const SaveTabEntriesMiddleware = (state: {getState: () => unknown}) => (next: (a:unknown) => unknown) => (action: unknown) => {
  const result = next(action);
  if((action as Action).type.startsWith('tabEntries/')){
    const currentState = state.getState();
    const { tabEntries } = currentState as {tabEntries: NewTabEntry[]}
    localStorage.setItem('snt-entries', JSON.stringify(tabEntries));
  }
  return result;
}