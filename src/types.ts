export interface Image {
    id: number|string;
    alt_description: string;
    likes: number;
    urls: {
      small: string;
      regular: string;
    };
   
  }