import type { Route } from "next";

export type INav = {
  main: INavGroup[];
  secondary: INavItem[];
};

export type INavGroup = {
  key: string;
  groupLabel?: string;
  items: INavItem[];
};

export type INavItem = {
  title: string;
  href: Route;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};
