type PageProps = {
  params: Promise<{
    name: string;
    id: number;
  }>;
};


type ProductCarouselProps = {
  products: Item[];
  nam?: string;
  gridcol?: string; 
};