import CoffeeIcon from '@mui/icons-material/Coffee';
import PeopleIcon from '@mui/icons-material/People';
import { HOME_PATH, EMPLOYEES_PATH } from '@/configs';
import Cafes from '@/pages/cafes/Cafes';
import Employees from '@/pages/employees/Employees';

export type RouteType = {
  path: string;
  label: string;
  icon: JSX.Element;
  element: JSX.Element;
};

export const routeList: RouteType[] = [
  {
    path: HOME_PATH,
    label: "Cafe's",
    icon: <CoffeeIcon />,
    element: <Cafes />,
  },
  {
    path: EMPLOYEES_PATH,
    label: 'Employees',
    icon: <PeopleIcon />,
    element: <Employees />,
  },
];

export const menuList = routeList;

export const navList = routeList.map(({ path, label }) => ({ key: path, label }));
