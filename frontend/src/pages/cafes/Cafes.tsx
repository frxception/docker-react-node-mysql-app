import {
  CafeDataMutationType,
  useAddCafeMutation,
  useDeleteCafeMutation,
  useCafeListQuery,
  useUpdateCafeMutation,
  CafeDataType,
  ResponseDataType as CafeResponseDataType,
} from '@/api/services/cafes';
import { Order } from '@/helpers/types/ui.types.ts';
import { getFormattedDateTime } from '@/helpers/utils';
import { useModalStore } from '@/hooks';
import AddIcon from '@mui/icons-material/Add';
import {
  Backdrop,
  Box, // Add this line
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TableSortLabel,
} from '@mui/material';
import { sortBy } from 'lodash';
import { useMemo, useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import CafeModal from './CafeModal';

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

  const dataQueryList = useMemo(() => {
    if (queryData) {
      return sortBy(queryData as unknown as CafeResponseDataType['data'], ['name']);
    }
  }, [queryData]);

  const existingCafeNames = useMemo(() => {
    return dataQueryList ? dataQueryList.map((cafe: CafeDataType) => cafe.name) : [];
  }, [dataQueryList]);

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
        existingCafeNames={existingCafeNames}
        mode={modalMode}
        initialData={selectedCafe}
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
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
          {loadingFetch && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          )}
          {!loadingFetch && !dataQueryList && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography>No data</Typography>
            </Box>
          )}
          {sortedData && (
            <TableContainer sx={{ flexGrow: 1, height: '100%' }}>
              <Table stickyHeader aria-label="cafe table">
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
                        active={orderBy === 'description'}
                        direction={orderBy === 'description' ? order : 'asc'}
                        onClick={() => handleRequestSort('description')}>
                        Description
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'location'}
                        direction={orderBy === 'location' ? order : 'asc'}
                        onClick={() => handleRequestSort('location')}>
                        Location
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'updatedAt'}
                        direction={orderBy === 'updatedAt' ? order : 'asc'}
                        onClick={() => handleRequestSort('updatedAt')}>
                        Update
                      </TableSortLabel>
                    </TableCell>
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
                        <Avatar src={data.logo} />
                        {data?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.employees.map((o) => <ol key={o.id}>{`- ${o.name}`}</ol>)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.location}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {getFormattedDateTime(data?.updatedAt)}
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
    </Box>
  );
};

export default Cafes;
