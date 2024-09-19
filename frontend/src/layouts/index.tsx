import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import errorBoundary from './ErrorBoundary.tsx';
import FooterComponent from './Footer.tsx';
import Header from './Header.tsx';

const LayoutComponent = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="px-4 py-20 flex flex-col min-h-screen">
        <ErrorBoundary fallbackRender={errorBoundary}>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <span>Loading...</span>
              </div>
            }>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;
