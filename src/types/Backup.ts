import { NewTabEntry } from "./NewTabEntries";
import { Preferences } from "./Preferences";

export interface Backup{
  entries: NewTabEntry[], 
  prefs: Preferences
}