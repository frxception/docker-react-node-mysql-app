import { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';

import Router from './Router.tsx';

const Routes = () => {
  return (
    <Suspense fallback="loading...">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
