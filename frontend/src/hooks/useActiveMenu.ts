import { useLocation } from '@tanstack/react-router';

export const useActiveMenu = () => {
  const router = useLocation();
  const path = router.pathname;

  const checkActive = (link: string) => {
    return path === link || path.includes(link);
  };

  return { checkActive };
};
