import React from 'react';

import { IconButton, Stack } from '@mui/material';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface GroupedActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const GroupedActionButtons: React.FC<GroupedActionButtonsProps> = ({ onEdit, onDelete }) => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        size="small">
        <FiEdit />
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        size="small">
        <FiTrash2 />
      </IconButton>
    </Stack>
  );
};

export default GroupedActionButtons;
