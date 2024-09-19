import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Modal,
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { CafeDataMutationType } from '@/api/services/cafes';

type Input = {
  name: string;
  description: string;
  employees: string; // Changed from number to string
  logo: string;
  location: string;
};

type CafeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CafeDataMutationType, id?: string) => void;
  loading: boolean;
  existingCafeNames: string[];
  mode: 'add' | 'edit';
  initialData?: CafeDataMutationType & { id?: string };
};

const CafeModal: React.FC<CafeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  existingCafeNames,
  mode,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<Input>();

  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      reset({
        ...initialData,
        employees: initialData?.employees?.toString(), // Convert to string
      });
    } else {
      reset({});
    }
  }, [initialData, mode, reset]);

  const handleClose = () => {
    if (isDirty) {
      setConfirmOpen(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    reset({});
    onClose();
  };

  const handleCancelClose = () => {
    setConfirmOpen(false);
  };

  const validateUniqueName = (value: string) => {
    if (mode === 'add' && existingCafeNames.includes(value)) {
      return 'A cafe with this name already exists';
    }
    if (mode === 'edit' && value !== initialData?.name && existingCafeNames.includes(value)) {
      return 'A cafe with this name already exists';
    }
    return true;
  };

  const onFormSubmit = (data: Input) => {
    onSubmit(
      {
        ...data,
        employees: parseInt(data.employees, 10), // Convert back to number
      } as unknown as CafeDataMutationType,
      initialData?.id
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center">
        <>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Box
            component="form"
            className="w-3/5 py-10 px-5 bg-white dark:bg-slate-700 rounded-xl"
            onSubmit={handleSubmit(onFormSubmit)}>
            <Typography variant="h5" className="mb-15 pb-6">
              {mode === 'add' ? 'Add Cafe' : 'Edit Cafe'}
            </Typography>

            <div className="flex flex-col gap-5">
              <Controller
                rules={{
                  required: 'Cafe name is required',
                  maxLength: { value: 6, message: 'Cafe name must be 6 characters or less' },
                  validate: validateUniqueName,
                }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={!!errors.name}
                      name="name"
                      label="Cafe Name"
                      inputProps={{ maxLength: 6 }}
                    />
                    {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
                  </FormControl>
                )}
                name="name"
              />

              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={errors.description ? true : false}
                      name="description"
                      label="Description"
                      inputProps={{ maxLength: 256 }}
                    />
                    {errors.description && <FormHelperText error>{errors.description.message}</FormHelperText>}
                  </FormControl>
                )}
                name="description"
              />

              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={errors?.employees ? true : false}
                      name="employees"
                      label="Employees"
                      type="number"
                    />
                    {errors?.employees && <FormHelperText error>{errors?.employees?.message}</FormHelperText>}
                  </FormControl>
                )}
                name="employees"
              />
              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={errors.location ? true : false}
                      name="location"
                      label="Location"
                    />
                    {errors.location && <FormHelperText error>{errors.location.message}</FormHelperText>}
                  </FormControl>
                )}
                name="location"
              />

              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField {...field} error={errors.logo ? true : false} name="logo" label="Logo" />
                    {errors.logo && <FormHelperText error>{errors.logo.message}</FormHelperText>}
                  </FormControl>
                )}
                name="logo"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <Button type="submit" size="small" variant="contained">
                {mode === 'add' ? 'Submit' : 'Update'}
              </Button>
            </div>
          </Box>
        </>
      </Modal>

      <Dialog
        open={confirmOpen}
        onClose={handleCancelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Confirm Exit'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to leave without {mode === 'add' ? 'submitting' : 'updating'} this entry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>Cancel</Button>
          <Button onClick={handleConfirmClose} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CafeModal;
