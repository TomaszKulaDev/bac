export interface FashionGridItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  url: string;
}

export interface FashionGridProps {
  fashionItems: FashionGridItem[];
  title?: string;
  showHeader?: boolean;
}
