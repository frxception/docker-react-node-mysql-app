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
import { EmployeeDataType } from '@/api/services/employees';
import { getFormattedDateTime } from '@/helpers/utils';

interface EmployeeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: EmployeeDataType | null;
}

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({ isOpen, onClose, employee }) => {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <Box style={{ padding: 20 }}>
        <DialogTitle>Employee Details</DialogTitle>
        <Divider />

        <DialogContent>
          <Stack direction="column" spacing={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h5">{employee.name}</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {employee.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {employee.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Gender:</strong> {employee.gender === 'M' ? 'Male' : 'Female'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Days Worked:</strong> {employee.days}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Created:</strong> {getFormattedDateTime(employee.createdAt)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Updated:</strong> {getFormattedDateTime(employee.updatedAt)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Cafe:</strong>{' '}
              {employee.cafe ? (
                <Chip
                  avatar={<Avatar src={employee.cafe.logo} />}
                  label={employee.cafe.name}
                  variant="outlined"
                />
              ) : (
                'Not assigned'
              )}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EmployeeDetailsModal;
