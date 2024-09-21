import GroupedActionButtons from '@/components/buttons/GroupedActionButtons.tsx';
import { Order } from '@/helpers/types/ui.types.ts';
import { getFormattedDateTime } from '@/helpers/utils';
import { omit } from 'lodash';
import { FC, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Backdrop,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { useModalStore } from '@/hooks';
import {
  EmployeeDataMutationType,
  EmployeeDataType,
  ResponseDataType,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useEmployeeListQuery,
  useUpdateEmployeeMutation,
} from '@/api/services/employees';
import EmployeeModal, { EmployeeModalProps } from './EmployeeModal';
import { CafeDataType, useCafeListQuery } from '@/api/services';
import SimpleDataTable, { Column } from '@/components/tables/SimpleDataTable';
import EmployeeDetailsModal from '@/components/modals/EmployeeDetailsModal';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADING_ANIMATION, TABLE_ANIMATION } from '@/configs/constant/ui.constants';

const Employees: FC = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const { data: queryData, isLoading: loadingFetch, refetch } = useEmployeeListQuery();
  const { data: cafes } = useCafeListQuery();
  const { mutate: addEmployee, isLoading: loadingCreate } = useAddEmployeeMutation();
  const { mutate: updateEmployee, isLoading: loadingUpdate } = useUpdateEmployeeMutation();
  const { mutate: deleteEmployee, isLoading: loadingDelete } = useDeleteEmployeeMutation();

  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedEmployee, setSelectedEmployee] = useState<
    (EmployeeDataMutationType & { id?: string }) | undefined
  >(undefined);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof EmployeeDataType>('name');

  const [selectedEmployeeForDetails, setSelectedEmployeeForDetails] = useState<EmployeeDataType | null>(null);

  const handleRequestSort = (property: keyof EmployeeDataType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    if (queryData) {
      return [...(queryData as unknown as ResponseDataType['data'])]?.sort((a, b) => {
        if (orderBy === 'name') {
          return order === 'asc' ? a?.name?.localeCompare(b?.name) : b?.name?.localeCompare(a?.name);
        }
        if (orderBy === 'days') {
          return order === 'asc' ? a?.days - b?.days : b?.days - a?.days;
        }
        if (orderBy === 'createdAt') {
          return order === 'asc'
            ? new Date(a?.createdAt).getTime() - new Date(b?.createdAt).getTime()
            : new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime();
        }
        if (orderBy === 'gender') {
          return order === 'asc' ? a?.name?.localeCompare(b?.gender) : b?.name?.localeCompare(a?.gender);
        }
        return 0;
      });
    }
    return [];
  }, [queryData, order, orderBy]);

  const handleCreateEmployee = (body: EmployeeDataMutationType) => {
    return addEmployee(body, {
      onSuccess: () => {
        void refetch();
        void close();
      },
    });
  };

  const handleUpdateEmployee = (body: EmployeeDataMutationType, id: string) => {
    if (!id) return;
    return updateEmployee(
      { id, data: omit(body, 'id') },
      {
        onSuccess: () => {
          void refetch();
          void close();
        },
      }
    );
  };

  const handleDeleteEmployee = (id: string) => {
    return deleteEmployee(id, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  const handleDelete = (e: EmployeeDataType) => {
    if (window.confirm(`Are you sure you want to delete "${e.name}"?`)) {
      handleDeleteEmployee(e.id as string);
    }
  };

  const handleSubmit = (data: EmployeeDataMutationType, id: string) => {
    if (modalMode === 'add') {
      handleCreateEmployee(data);
    } else {
      handleUpdateEmployee(data, id);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedEmployee(undefined);
    open();
  };

  const handleOpenEditModal = (cafe: EmployeeDataMutationType) => {
    setModalMode('edit');
    setSelectedEmployee(cafe as EmployeeDataMutationType & { id?: string });
    open();
  };

  const handleRowClick = (employee: EmployeeDataType) => {
    setSelectedEmployeeForDetails(employee);
  };

  const handleCloseDetailsModal = () => {
    setSelectedEmployeeForDetails(null);
  };

  const columns: Column<EmployeeDataType>[] = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name', sortable: true },
    {
      id: 'gender',
      label: 'Gender',
      sortable: true,
      render: (value) => ((value as string)?.toUpperCase() === 'M' ? 'Male' : 'Female'),
    },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'days', label: 'Days', sortable: true },
    {
      id: 'createdAt',
      label: 'Added',
      sortable: true,
      render: (value) => getFormattedDateTime(value as string),
    },
    {
      id: 'cafe',
      label: 'Cafe',
      render: (value) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={(value as CafeDataType)?.logo} />
          {(value as CafeDataType)?.name}
        </Box>
      ),
    },
    {
      id: 'actions' as keyof EmployeeDataType,
      label: 'Actions',
      render: (_, row) => (
        <GroupedActionButtons onEdit={() => handleOpenEditModal(row)} onDelete={() => handleDelete(row)} />
      ),
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDelete || loadingUpdate}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <EmployeeModal
        isOpen={isOpen}
        onClose={close}
        onSubmit={handleSubmit as any}
        loading={loadingCreate || loadingUpdate}
        mode={modalMode}
        initialData={selectedEmployee as EmployeeModalProps['initialData']}
        cafes={cafes as unknown as EmployeeModalProps['cafes']}
      />

      <EmployeeDetailsModal
        isOpen={!!selectedEmployeeForDetails}
        onClose={handleCloseDetailsModal}
        employee={selectedEmployeeForDetails}
      />

      <Card
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
        <CardHeader
          title="Employee"
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
                style={{ flex: 1 }}>
                <SimpleDataTable
                  data={sortedData}
                  columns={columns}
                  orderBy={orderBy}
                  order={order}
                  onRequestSort={handleRequestSort}
                  emptyMessage="No employees found"
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

export default Employees;
