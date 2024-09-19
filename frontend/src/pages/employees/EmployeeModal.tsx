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
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { EmployeeDataMutationType } from '@/api/services/employees';

type Input = {
  name: string;
  phone: string;
  email: string;
  days: string;
  cafesId: string;
  gender: string;
};

export type EmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeDataMutationType, id?: string) => void;
  loading: boolean;
  mode: 'add' | 'edit';
  initialData?: EmployeeDataMutationType & { id?: number };
  cafes: { id: string; name: string }[];
};

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  mode,
  initialData,
  cafes,
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
      } as any);
    } else {
      reset({ gender: 'M' }); // Initialize with default gender 'M'
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

  const onFormSubmit = (data: Input) => {
    onSubmit(
      {
        ...data,
        days: parseInt(data?.days),
      } as EmployeeDataMutationType,
      initialData?.id
    );
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-phone"
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
              {mode === 'add' ? 'Add Employee' : 'Edit Employee'}
            </Typography>

            <div className="flex flex-col gap-5">
              <Controller
                rules={{
                  required: 'Employee name is required',
                  maxLength: { value: 50, message: 'Employee name must be 50 characters or less' },
                }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={!!errors.name}
                      name="name"
                      label="Employee Name"
                      inputProps={{ maxLength: 50 }}
                    />
                    {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
                  </FormControl>
                )}
                name="name"
              />
              <Controller
                rules={{ required: 'Gender is required' }}
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.gender}>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row {...field}>
                      <FormControlLabel value="M" control={<Radio />} label="Male" />
                      <FormControlLabel value="F" control={<Radio />} label="Female" />
                    </RadioGroup>
                    {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                  </FormControl>
                )}
                name="gender"
              />
              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={errors.phone ? true : false}
                      name="phone"
                      label="Mobile"
                      type="tel"
                      inputProps={{ maxLength: 15 }}
                    />
                    {errors.phone && <FormHelperText error>{errors.phone.message}</FormHelperText>}
                  </FormControl>
                )}
                name="phone"
              />

              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      error={errors.email ? true : false}
                      name="email"
                      label="Email"
                      type="email"
                    />
                    {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                  </FormControl>
                )}
                name="email"
              />

              <Controller
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      type="number"
                      error={errors.days ? true : false}
                      name="days"
                      label="Days"
                    />
                    {errors.days && <FormHelperText error>{errors.days.message}</FormHelperText>}
                  </FormControl>
                )}
                name="days"
              />

              <Controller
                rules={{ required: 'Cafe is required' }}
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.cafesId}>
                    <Select
                      {...field}
                      displayEmpty
                      labelId="cafe-select-label"
                      id="cafe-select"
                      label="SelectCafe"
                      placeholder="Select a Cafe">
                      <MenuItem value="" disabled>
                        <em>Select a Cafe</em>
                      </MenuItem>
                      {cafes?.map((cafe) => (
                        <MenuItem key={cafe?.id} value={cafe?.id}>
                          {cafe?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.cafesId && <FormHelperText>{errors.cafesId.message}</FormHelperText>}
                  </FormControl>
                )}
                name="cafesId"
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
        aria-describedby="alert-dialog-phone">
        <DialogTitle id="alert-dialog-title">{'Confirm Exit'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-phone">
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

export default EmployeeModal;
