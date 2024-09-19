import { Link, useRouter } from '@tanstack/react-router';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { routeList } from '@/configs/constant/navigation.constants';

const Sidebar = () => {
  const router = useRouter();
  const theme = useTheme();

  const isRouteActive = (path: string) => {
    const currentPath = router.state.location.pathname;
    return currentPath === path || (path !== '/' && currentPath.startsWith(path));
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', mt: 8 },
      }}>
      <List>
        {routeList.map((route) => {
          const isActive = isRouteActive(route.path);

          return (
            <Link
              key={route.path}
              to={route.path}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              onClick={(event) => {
                event.preventDefault();
                router.navigate({ to: route.path });
              }}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={isActive}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.action.selected,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    },
                  }}>
                  <ListItemIcon
                    sx={{
                      color: isActive ? theme.palette.primary.main : 'inherit',
                    }}>
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.label}
                    sx={{
                      color: isActive ? theme.palette.primary.main : 'inherit',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
