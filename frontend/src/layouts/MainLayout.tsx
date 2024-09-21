import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { useColorMode } from '@/hooks/useColorMode';

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode, mode } = useColorMode();

  const themeToggleVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  const backgroundVariants = {
    light: { backgroundColor: theme.palette.background.default },
    dark: { backgroundColor: theme.palette.background.default },
  };

  return (
    <motion.div initial={false} animate={mode} variants={backgroundVariants} transition={{ duration: 0.3 }}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cafe Management
            </Typography>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial="initial"
                animate="animate"
                exit="initial"
                variants={themeToggleVariants}
                transition={{ duration: 0.5 }}>
                <IconButton onClick={toggleColorMode} color="inherit">
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </motion.div>
            </AnimatePresence>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            mt: ['48px', '56px', '64px'],
          }}>
          <PageTransition>
            <Box sx={{ height: '100%', overflow: 'auto', width: '100%', maxWidth: '100%' }}>
              <Outlet />
            </Box>
          </PageTransition>
        </Box>
      </Box>
    </motion.div>
  );
};

export default MainLayout;
