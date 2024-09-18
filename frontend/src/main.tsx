import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';
import { BasicToaster } from '@/components';
import QueryProvider from '@/providers/QueryProvider.tsx';
import ThemeConfigProvider from '@/providers/ThemeConfigProvider.tsx';
import Routes from '@/routes/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeConfigProvider>
      <QueryProvider>
        <BasicToaster />
        <Routes />
      </QueryProvider>
    </ThemeConfigProvider>
  </React.StrictMode>
);
