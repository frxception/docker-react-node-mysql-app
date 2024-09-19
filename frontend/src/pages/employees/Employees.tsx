import { Order } from '@/helpers/types/ui.types.ts';
import { getFormattedDateTime } from '@/helpers/utils';
import { omit } from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import {
  Avatar,
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableSortLabel,
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
import { useCafeListQuery } from '@/api/services';

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

  const handleRequestSort = (property: keyof EmployeeDataType) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    if (queryData) {
      return [...(queryData as unknown as ResponseDataType['data'])].sort((a, b) => {
        if (orderBy === 'name') {
          return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        if (orderBy === 'days') {
          return order === 'asc' ? a.days - b.days : b.days - a.days;
        }
        if (orderBy === 'createdAt') {
          return order === 'asc'
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (orderBy === 'gender') {
          return order === 'asc' ? a.name.localeCompare(b.gender) : b.name.localeCompare(a.gender);
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

  return (
    <React.Fragment>
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

      <Card>
        <CardHeader
          title="Employee"
          action={
            <IconButton onClick={handleOpenAddModal}>
              <AddIcon />
            </IconButton>
          }
        />
        <CardContent>
          {loadingFetch && (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          )}
          {!loadingFetch && !sortedData && (
            <div className="flex justify-center">
              <Typography className="text-black">No data</Typography>
            </div>
          )}
          {sortedData && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="employee table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}>
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'gender'}
                        direction={orderBy === 'gender' ? order : 'asc'}
                        onClick={() => handleRequestSort('gender')}>
                        Gender
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'days'}
                        direction={orderBy === 'days' ? order : 'asc'}
                        onClick={() => handleRequestSort('days')}>
                        Days
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'createdAt'}
                        direction={orderBy === 'createdAt' ? order : 'asc'}
                        onClick={() => handleRequestSort('createdAt')}>
                        Added
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Cafe</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((data) => (
                    <TableRow key={data?.id}>
                      <TableCell component="th" scope="row">
                        {data?.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.gender?.toUpperCase() === 'M' ? 'Male' : 'Female'}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.email}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.phone}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.days}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {getFormattedDateTime(data?.createdAt)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Avatar src={data?.cafe?.logo} />
                        {data?.cafe?.name}
                      </TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => handleOpenEditModal(data)}>
                          <FiEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(data)}>
                          <FiTrash2 />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Employees;
