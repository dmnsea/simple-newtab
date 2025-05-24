export type NewTabEntry = NewTabWebsite | NewTabFolder;

export interface NewTabWebsite{
  type: 'website';
  id: number;
  title: string;
  url: string;
}

export interface NewTabFolder{
  type: 'folder';
  id: number;
  title: string;
  children: NewTabEntry[]
}