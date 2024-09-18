import { FC, lazy } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { routeList } from '@/configs/constant/navigation.constants.tsx';
import LayoutComponent from '@/layouts';

const NotFound = lazy(() => import('@/pages/not-found/NotFound.tsx'));

const routes = [
  {
    path: '/',
    element: <LayoutComponent />,
    children: [
      {
        path: '',
        element: <Navigate to="cafes" />,
      },
      ...routeList,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

const Router: FC = () => {
  return useRoutes(routes);
};

export default Router;
