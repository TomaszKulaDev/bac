export interface NavigationLink {
  href: string;
  label: string;
  submenu?: {
    featured?: {
      title: string;
      items: SubMenuItem[];
    };
    categories: {
      title: string;
      items: SubMenuItem[];
    }[];
  };
}

export interface SubMenuItem {
  href: string;
  label: string;
  image?: string;
  description?: string;
}
