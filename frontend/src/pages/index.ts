import { lazy } from 'react';

const Cafes = lazy(() => import('@/pages/cafes/Cafes.tsx'));

const Employees = lazy(() => import('@/pages/employees/Employees.tsx'));

export { Cafes, Employees };
