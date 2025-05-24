export interface PayloadFolder{
  id: number;
  title: string;
  parent: number;
}

export interface PayloadWebsite extends PayloadFolder {
  url: string;
  image?: string;
}