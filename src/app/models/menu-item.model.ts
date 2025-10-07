
export interface SubMenuItem {
  name: string;
  route: string;
  selected: boolean;
}

export interface MenuItem {
  name: string;
  route: string;
  selected: boolean;
  open: boolean;
  subItems?: SubMenuItem[];
}
