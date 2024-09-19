import { cloneDeep } from 'lodash';
import { Link } from 'react-router-dom';

import { HOME_PATH, EMPLOYEES_PATH } from '@/configs';
import { NavType, RoutesType } from '@/helpers/types/ui.types.ts';
import { capitalizeFirstLetter } from '@/helpers/utils';
import { Cafes, Employees } from '@/pages';

const navigationConstants: NavType[] = [
  {
    key: HOME_PATH,
    label: "Cafe's",
    element: <Cafes />,
  },
  {
    key: EMPLOYEES_PATH,
    label: 'Employees',
    element: <Employees />,
  },
];

const getRoutes = (arr: RoutesType[], nav: NavType, basePath = '') => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element,
  });

  return arr;
};

const addLink = (nav: NavType, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label as string)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label as string)}</Link>
  );
};

const getShowNavigation = (nav: NavType, basePath = ''): NavType | undefined => {
  if (!nav.label) return;
  if (nav.children) {
    const arr: NavType[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    nav.children = arr.length > 0 ? arr : undefined;
  }

  return {
    key: basePath + nav.key,
    label: addLink(nav, basePath + nav.key),
    children: nav.children,
    element: nav.element,
  };
};

const menuList: NavType[] = [];
const routeList: RoutesType[] = [];
const navList: NavType[] = navigationConstants.map((nav) => ({
  key: nav.key,
  label: nav.label,
}));

for (const nav of navigationConstants) {
  const nav1 = cloneDeep(nav);
  const n = getShowNavigation(nav1);
  n && menuList.push(n);

  const nav2 = cloneDeep(nav);
  getRoutes(routeList, nav2);
}

export { routeList, menuList, navList };
