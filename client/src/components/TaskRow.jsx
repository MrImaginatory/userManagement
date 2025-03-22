import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';

const TaskRow = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'red';
      case 'in progress':
        return 'yellow';
      case 'completed':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <TableRow key={task.id}>
      <TableCell>{task.taskName}</TableCell>
      <TableCell>{task.description}</TableCell>
      <TableCell>{task.addedBy}</TableCell>
      <TableCell>{task.assignedTo}</TableCell>
      <TableCell style={{ color: getStatusColor(task.status) }}>{task.status}</TableCell>
      <TableCell>
        <Button variant="outlined" color="primary" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => onDelete(task.id)} style={{ marginLeft: '8px' }}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TaskRow;