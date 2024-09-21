import { Link, useRouter } from '@tanstack/react-router';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { routeList } from '@/configs/constant/navigation.constants';

const Sidebar = () => {
  const router = useRouter();
  const theme = useTheme();

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
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: theme.palette.action.selected,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    },
                  }}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
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
