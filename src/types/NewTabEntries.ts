export type NewTabEntry = NewTabWebsite | NewTabFolder;

// bunch of base64 images
export interface WebsiteInfo{
  title: string;
  fav_icon?: string;
  rel_icon?: string;
  og_img?: string;
  tw_img?: string;
}

export interface NewTabWebsite{
  type: 'website';
  parent: number;
  id: number;
  title: string;
  title_unset: boolean;
  url: string;
  img: string; // one from WebsiteImages
  img_cached: boolean;
}

export interface NewTabFolder{
  type: 'folder';
  parent: number;
  id: number;
  title: string;
}