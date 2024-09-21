export const LOADING_ANIMATION = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const TABLE_ANIMATION = {
  tableContainerAnimation: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  rowAnimation: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
} as const;
