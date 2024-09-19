import {
  CafeDataMutationType,
  useAddCafeMutation,
  useDeleteCafeMutation,
  useCafeListQuery,
  useUpdateCafeMutation,
} from '@/api/services/cafes';
import { EmployeeDataType, ResponseDataType } from '@/api/services/employees';
import { useModalStore } from '@/hooks';
import AddIcon from '@mui/icons-material/Add';
import {
  Backdrop,
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
  Paper,
} from '@mui/material';
import { omit } from 'lodash';
import React, { useMemo, useState } from 'react';
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

  const dataQueryList = useMemo(() => {
    if (queryData) {
      return (queryData as unknown as ResponseDataType['data'])?.sort((a, b) => {
        if (a.name && !b.name) {
          return 1;
        } else if (!a.name && b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }, [queryData]);

  const existingCafeNames = useMemo(() => {
    return dataQueryList ? dataQueryList.map((cafe: EmployeeDataType) => cafe.name) : [];
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
      { id, data: omit(body, 'id') },
      {
        onSuccess: () => {
          void refetch();
          void close();
        },
      }
    );
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

  const handleOpenEditModal = (cafe: EmployeeDataType) => {
    setModalMode('edit');
    setSelectedCafe(cafe as CafeDataMutationType & { id?: string });
    open();
  };

  const handleDeleteCafe = (id: string) => {
    return deleteCafe(id, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  // const handleEdit = (cafe: EmployeeDataType) => {
  //   if (window.confirm(`Are you sure you want to edit "${cafe.name}"?`)) {
  //     const newName = prompt('Enter new cafe name', cafe.name);
  //     if (newName && newName !== cafe.name) {
  //       handleUpdateCafe({ name: newName }, cafe.id as string);
  //     }
  //   }
  // };

  const handleDelete = (cafe: EmployeeDataType) => {
    if (window.confirm(`Are you sure you want to delete "${cafe.name}"?`)) {
      handleDeleteCafe(cafe.id as string);
    }
  };

  return (
    <React.Fragment>
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

      <Card>
        <CardHeader
          title="Cafe"
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
          {!loadingFetch && !dataQueryList && (
            <div className="flex justify-center">
              <Typography className="text-black">No data</Typography>
            </div>
          )}
          {dataQueryList && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="cafe table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataQueryList.map((data: EmployeeDataType) => (
                    <TableRow key={data?.id}>
                      <TableCell component="th" scope="row">
                        {data?.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.description}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.employees}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data?.location}
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

export default Cafes;
