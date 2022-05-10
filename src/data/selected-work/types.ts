export interface SelectedProjectsProps {
  data?: Project[];
}

export interface Project {
  id?: string;
  title?: string;
  shortDescription?: string;
  thumbnail?: Thumbnail;
  skills?: string[];
  details?: Details;
}

export interface Details {
  date?: string;
  description?: string;
  cover?: Thumbnail;
  sourceCode?: string;
  problem?: string[];
  solution?: string[];
  photos?: Thumbnail[];
}

export interface Thumbnail {
  src?: string;
  width?: number;
  height?: number;
  alt?: Alt;
}

export enum Alt {
  Cenas = "cenas",
}
