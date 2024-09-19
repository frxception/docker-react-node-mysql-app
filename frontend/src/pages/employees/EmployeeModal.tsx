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
  InputLabel,
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
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '528px', // Increased from 440px to 528px (additional 20% increase)
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#ffffff'),
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {mode === 'add' ? 'Add Employee' : 'Edit Employee'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{ mt: 2 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Employee name is required',
                maxLength: { value: 50, message: 'Employee name must be 50 characters or less' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Employee Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                  inputProps={{ maxLength: 50 }}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: 'Gender is required' }}
              render={({ field }) => (
                <FormControl component="fieldset" margin="normal" error={!!errors.gender}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="M" control={<Radio />} label="Male" />
                    <FormControlLabel value="F" control={<Radio />} label="Female" />
                  </RadioGroup>
                  {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                  type="email"
                />
              )}
            />
            <Controller
              name="days"
              control={control}
              rules={{ required: 'Days is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Days"
                  error={!!errors.days}
                  helperText={errors.days?.message}
                  margin="normal"
                  type="number"
                />
              )}
            />
            <Controller
              name="cafesId"
              control={control}
              rules={{ required: 'Cafe is required' }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.cafesId}>
                  <InputLabel id="cafe-select-label">Cafe</InputLabel>
                  <Select {...field} labelId="cafe-select-label" label="Cafe">
                    {cafes?.map((cafe) => (
                      <MenuItem key={cafe?.id} value={cafe?.id}>
                        {cafe?.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.cafesId && <FormHelperText>{errors.cafesId.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={loading}>
                {mode === 'add' ? 'Add' : 'Update'}
              </Button>
            </Box>
          </Box>
        </Box>
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

export default EmployeeModal;
