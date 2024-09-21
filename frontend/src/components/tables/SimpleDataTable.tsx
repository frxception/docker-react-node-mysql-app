import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { Order } from '@/helpers/types/ui.types';

export type Column<T> = {
  id: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type SimpleDataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  orderBy: keyof T;
  order: Order;
  onRequestSort: (property: keyof T) => void;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  rowAnimation?: any;
};

function SimpleDataTable<T extends Record<string, any>>({
  data,
  columns,
  orderBy,
  order,
  onRequestSort,
  emptyMessage = 'No data',
  onRowClick,
  rowAnimation,
}: SimpleDataTableProps<T>) {
  if (data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <Typography>{emptyMessage}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <Table stickyHeader sx={{ width: '100%' }}>
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={`table_cell-${column?.id as string}-${column?.label}`}>
                {column?.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column?.id ? order : 'asc'}
                    onClick={() => onRequestSort(column?.id)}>
                    {column?.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <motion.tr
              key={`table_row-${row?.id}-${index}`}
              variants={rowAnimation}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              whileHover={{
                backgroundColor: 'rgba(0, 0, 0, 0.07)',
                transition: { duration: 0.2 },
              }}>
              {columns?.map((column, cIndex) => (
                <TableCell key={`table_body_cell-${column.id as string}-${cIndex}`}>
                  {column?.render ? column?.render(row[column?.id], row) : row[column?.id]}
                </TableCell>
              ))}
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleDataTable;
