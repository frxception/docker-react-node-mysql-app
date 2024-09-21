import { Suspense, useState, useEffect } from 'react';

import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Outlet } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';

import errorBoundary from './ErrorBoundary.tsx';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';

const LayoutComponent = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) return true;
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Header darkMode={darkMode} setDarkMode={handleThemeChange} />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            height: 'calc(100vh - 64px)', // Adjust this value based on your header height
          }}>
          <ErrorBoundary fallbackRender={errorBoundary}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LayoutComponent;
