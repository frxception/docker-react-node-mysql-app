import { Router, Route, RootRoute } from '@tanstack/react-router';

import { HOME_PATH, EMPLOYEES_PATH } from '@/configs';
import LayoutComponent from '@/layouts';
import Cafes from '@/pages/cafes/Cafes';
import Employees from '@/pages/employees/Employees';
import NotFound from '@/pages/not-found/NotFound';

const rootRoute = new RootRoute({
  component: LayoutComponent,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Cafes,
});

const cafesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: HOME_PATH,
  component: Cafes,
});

const employeesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: EMPLOYEES_PATH,
  component: Employees,
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

const routeTree = rootRoute.addChildren([indexRoute, cafesRoute, employeesRoute, notFoundRoute]);

export const router = new Router({ routeTree });
