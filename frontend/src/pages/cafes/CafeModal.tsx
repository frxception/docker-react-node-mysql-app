import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
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
        name: initialData.name,
        description: initialData.description,
        logo: initialData.logo,
        location: initialData.location,
      });
    } else {
      reset({ name: '', description: '', logo: '', location: '' });
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
        employees: initialData?.employees || [],
      } as CafeDataMutationType,
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
            {mode === 'add' ? 'Add Cafe' : 'Edit Cafe'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{ mt: 2 }}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: 'Cafe name is required',
                maxLength: { value: 6, message: 'Cafe name must be 6 characters or less' },
                validate: validateUniqueName,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Cafe Name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  margin="normal"
                  inputProps={{ maxLength: 6 }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  margin="normal"
                  multiline
                  rows={3}
                />
              )}
            />
            <Controller
              name="location"
              control={control}
              rules={{ required: 'Location is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Location"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  margin="normal"
                />
              )}
            />
            <Controller
              name="logo"
              control={control}
              rules={{ required: 'Logo URL is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Logo URL"
                  error={!!errors.logo}
                  helperText={errors.logo?.message}
                  margin="normal"
                />
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

export default CafeModal;
