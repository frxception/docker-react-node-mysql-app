import { useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import { Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { isEmpty, sortBy } from 'lodash';
import { FiAlertTriangle } from 'react-icons/fi';

import CafeModal from './CafeModal';
import {
  CafeDataMutationType,
  useAddCafeMutation,
  useDeleteCafeMutation,
  useCafeListQuery,
  useUpdateCafeMutation,
  CafeDataType,
  ResponseDataType as CafeResponseDataType,
} from '@/api/services/cafes';
import GroupedActionButtons from '@/components/buttons/GroupedActionButtons';
import CafeDetailsModal from '@/components/modals/CafeDetailsModal';
import SimpleDataTable, { Column } from '@/components/tables/SimpleDataTable';
import { LOADING_ANIMATION, TABLE_ANIMATION } from '@/configs/constant/ui.constants';
import { Order } from '@/helpers/types/ui.types.ts';
import { getFormattedDateTime } from '@/helpers/utils';
import { useModalStore } from '@/hooks';


const Cafes = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const { data: queryData, isLoading: loadingFetch, refetch } = useCafeListQuery();

  const { mutate: addCafe, isLoading: loadingCreate } = useAddCafeMutation();
  const { mutate: updateCafe, isLoading: loadingUpdate } = useUpdateCafeMutation();
  const { mutate: deleteCafe, isLoading: loadingDelete } = useDeleteCafeMutation();

  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedCafe, setSelectedCafe] = useState<(CafeDataMutationType & { id?: string }) | undefined>(
    undefined
  );

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof CafeDataType>('name');

  const [selectedCafeForDetails, setSelectedCafeForDetails] = useState<CafeDataType | null>(null);

  const dataQueryList = useMemo(() => {
    if (queryData) {
      return sortBy(queryData as unknown as CafeResponseDataType['data'], ['name']);
    }
  }, [queryData]);

  const handleCreateCafe = (body: CafeDataMutationType) => {
    return addCafe(body, {
      onSuccess: () => {
        void refetch();
        void close();
      },
    });
  };

  const handleUpdateCafe = (body: CafeDataMutationType, id?: string) => {
    if (!id) return;
    return updateCafe(
      { id, data: { ...body, employees: body?.employees?.map((emp) => emp.id) as any } },
      {
        onSuccess: () => {
          void refetch();
          void close();
        },
      }
    );
  };

  const handleDeleteCafe = (id: string) => {
    return deleteCafe(id, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  const handleDelete = (cafe: CafeDataType) => {
    if (window.confirm(`Are you sure you want to delete "${cafe.name}"?`)) {
      handleDeleteCafe(cafe.id as string);
    }
  };

  const handleSubmit = (data: CafeDataMutationType, id?: string) => {
    if (modalMode === 'add') {
      handleCreateCafe(data);
    } else {
      handleUpdateCafe(data, id);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedCafe(undefined);
    open();
  };

  const handleOpenEditModal = (cafe: CafeDataType) => {
    setModalMode('edit');
    setSelectedCafe(cafe as CafeDataMutationType & { id?: string });
    open();
  };

  const handleRowClick = (cafe: CafeDataType) => {
    setSelectedCafeForDetails(cafe);
  };

  const handleCloseDetailsModal = () => {
    setSelectedCafeForDetails(null);
  };

  const handleRequestSort = (property: keyof CafeDataType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    if (dataQueryList) {
      return [...dataQueryList].sort((a, b) => {
        if (orderBy === 'name' || orderBy === 'location' || orderBy === 'description') {
          const aValue = a[orderBy]?.toLowerCase() || '';
          const bValue = b[orderBy]?.toLowerCase() || '';
          if (order === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }
        if (orderBy === 'updatedAt') {
          const aValue = new Date(a[orderBy] || 0).getTime();
          const bValue = new Date(b[orderBy] || 0).getTime();
          if (order === 'asc') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }
        return 0;
      });
    }
    return [];
  }, [dataQueryList, order, orderBy]);

  const columns: Column<CafeDataType>[] = [
    { id: 'id', label: 'ID' },
    {
      id: 'name',
      label: 'Name',
      sortable: true,
      render: (value, row) => (
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar src={row.logo} />
          {value as string}
        </Stack>
      ),
    },
    { id: 'description', label: 'Description', sortable: true },
    {
      id: 'employees',
      label: 'Employees',
      render: (value) =>
        isEmpty(value) ? (
          <Stack direction="row" spacing={1}>
            <FiAlertTriangle size={20} color="orange" />
            <Typography fontSize={13}>No employees</Typography>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            {(value as any[])?.map((o, i) => (
              <Chip variant="outlined" key={`chip_${o?.id}-${i}`} label={o?.name} />
            ))}
          </Stack>
        ),
    },
    { id: 'location', label: 'Location', sortable: true },
    {
      id: 'updatedAt',
      label: 'Update',
      sortable: true,
      render: (value) => getFormattedDateTime(value as string),
    },
    {
      id: 'actions' as keyof CafeDataType,
      label: 'Actions',
      render: (_, row) => (
        <GroupedActionButtons onEdit={() => handleOpenEditModal(row)} onDelete={() => handleDelete(row)} />
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDelete || loadingUpdate}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CafeModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleSubmit}
        loading={loadingCreate || loadingUpdate}
        mode={modalMode}
        initialData={selectedCafe}
      />

      <CafeDetailsModal
        isOpen={!!selectedCafeForDetails}
        onClose={handleCloseDetailsModal}
        cafe={selectedCafeForDetails}
      />

      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardHeader
          title="Cafe"
          action={
            <IconButton onClick={handleOpenAddModal}>
              <AddIcon />
            </IconButton>
          }
        />
        <CardContent
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 0, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {loadingFetch ? (
              <motion.div
                key="loading"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={LOADING_ANIMATION}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.8)',
                }}>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                  }}>
                  <CircularProgress size={60} thickness={4} />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={TABLE_ANIMATION.tableContainerAnimation}
                transition={{ duration: 0.5 }}
                style={{ flex: 1, width: '100%' }}>
                <SimpleDataTable
                  data={sortedData}
                  columns={columns}
                  orderBy={orderBy}
                  order={order}
                  onRequestSort={handleRequestSort}
                  emptyMessage="No cafes found"
                  onRowClick={handleRowClick}
                  rowAnimation={TABLE_ANIMATION.rowAnimation}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Cafes;
