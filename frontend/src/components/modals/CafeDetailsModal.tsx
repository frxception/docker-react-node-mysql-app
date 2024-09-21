import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { CafeDataType } from '@/api/services/cafes';
import { getFormattedDateTime } from '@/helpers/utils';

interface CafeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cafe: CafeDataType | null;
}

const CafeDetailsModal: React.FC<CafeDetailsModalProps> = ({ isOpen, onClose, cafe }) => {
  if (!cafe) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <Box style={{ padding: 20 }}>
        <DialogTitle>Cafe Details</DialogTitle>
        <Divider />
        <DialogContent>
          {' '}
          {/* Added 12px padding here */}
          <Stack direction="column" spacing={2}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar src={cafe.logo} sx={{ width: 100, height: 100, mr: 2 }} />
              <Typography variant="h5">{cafe.name}</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {cafe.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Location:</strong> {cafe.location}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Created:</strong> {getFormattedDateTime(cafe.createdAt)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Updated:</strong> {getFormattedDateTime(cafe.updatedAt)}
            </Typography>
            <Typography variant="h6" mt={2} mb={1}>
              Employees:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {cafe.employees && cafe.employees.length > 0 ? (
                cafe.employees.map((employee) => (
                  <Chip key={employee.id} label={employee.name} variant="outlined" />
                ))
              ) : (
                <Typography variant="body2">No employees</Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CafeDetailsModal;
