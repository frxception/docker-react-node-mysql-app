import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import MainLayout from './layouts/MainLayout';
import Cafes from './pages/cafes/Cafes';
import Employees from './pages/employees/Employees';

const rootRoute = createRootRoute({
  component: MainLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Cafes,
});

const cafesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cafes',
  component: Cafes,
});

const employeesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employees',
  component: Employees,
});

const routeTree = rootRoute.addChildren([indexRoute, cafesRoute, employeesRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
