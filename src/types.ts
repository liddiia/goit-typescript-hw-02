export interface Image {
    id: number|string;
    alt_description: string;
    likes: number;
    urls: {
      small: string;
      regular: string;
    };
   
  }
  export interface Images {
     total: number,
    total_pages: number,
    results: Image[];
    };
   
