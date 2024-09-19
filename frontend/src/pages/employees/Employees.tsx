import React, { FC, useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { FiTrash2 } from 'react-icons/fi';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useModalStore } from '@/hooks';
import { Controller, useForm } from 'react-hook-form';
import {
  EmployeeDataMutationType,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useEmployeeListQuery,
  useUpdateEmployeeMutation,
} from '@/api/services/employees';

type Input = {
  employeeName: string;
};

const Employees: FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const isOpen = useModalStore((state) => state.isOpen);
  const open = useModalStore((state) => state.open);
  const close = useModalStore((state) => state.close);

  const { data: queryData, isLoading: loadingFetch, refetch } = useEmployeeListQuery();

  const { mutate: addEmployee, isLoading: loadingCreate } = useAddEmployeeMutation();
  const { mutate: updateEmployee, isLoading: loadingUpdate } = useUpdateEmployeeMutation();
  const { mutate: deleteEmployee, isLoading: loadingDelete } = useDeleteEmployeeMutation();

  const dataQueryList = useMemo(() => {
    if (queryData && queryData.data) {
      return queryData?.data.sort((a, b) => {
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

  const handleCreateEmployee = (body: EmployeeDataMutationType) => {
    return addEmployee(body, {
      onSuccess: () => {
        void refetch();
        void reset({ employeeName: '' });
        void close();
      },
    });
  };

  const handleUpdateEmployee = (body: { id: string; data: EmployeeDataMutationType }) => {
    return updateEmployee(body, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  const handleDeleteEmployee = (id: string) => {
    return deleteEmployee(id, {
      onSuccess: () => {
        void refetch();
      },
    });
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDelete || loadingUpdate}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center">
        <>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingCreate}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            component="form"
            className="w-3/5 py-10 px-5 bg-white dark:bg-slate-700 rounded-xl"
            onSubmit={handleSubmit(handleCreateEmployee as any)}>
            <Controller
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    error={errors.employeeName ? true : false}
                    name="employeeName"
                    label="Employee Name"
                  />
                  {errors.employeeName && <FormHelperText error>{errors.employeeName.message}</FormHelperText>}
                </FormControl>
              )}
              name="employeeName"
            />
            <div className="mt-5 flex justify-end">
              <Button type="submit" size="small" variant="contained">
                Submit
              </Button>
            </div>
          </Box>
        </>
      </Modal>
      <Card>
        <CardHeader
          title="Employee"
          action={
            <IconButton onClick={open}>
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
          {dataQueryList &&
            dataQueryList.map((data) => (
              <div key={data?.id} className="flex justify-between items-center">
                <div>{data?.name}</div>
                <IconButton onClick={() => handleDeleteEmployee(data?.id as string)}>
                  <FiTrash2 />
                </IconButton>
              </div>
            ))}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Employees;
