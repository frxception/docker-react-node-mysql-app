import { ReactElement } from 'react';

type NavsChildType = {
  key: string;
  label?: string | ReactElement;
  element?: ReactElement;
};

export type NavType = NavsChildType & {
  children?: NavType[];
};

type RouteChildType = {
  path: string;
  element: ReactElement;
};

export type RoutesType = RouteChildType & {
  children?: RouteChildType[];
};
