export interface PayloadFolder{
  id: number;
  title: string;
  parent: number;
}

export interface PayloadWebsite {
  id: number;
  title?: string;
  parent: number;
  url?: string;
  image?: string;
}