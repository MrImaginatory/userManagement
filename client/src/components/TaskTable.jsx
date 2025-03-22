import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box } from '@mui/material';
import TaskDialog from './TaskDialog';
import TaskRow from './TaskRow';

const TaskTable = () => {
  const [filterOption, setFilterOption] = useState('all');
  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Task 1', description: 'Description for Task 1', addedBy: 'User  A', assignedTo: 'User  B', status: 'pending' },
    { id: 2, taskName: 'Task 2', description: 'Description for Task 2', addedBy: 'User  C', assignedTo: 'User  D', status: 'in progress' },
    { id: 3, taskName: 'Task 3', description: 'Description for Task 3', addedBy: 'User  E', assignedTo: 'User  F', status: 'completed' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    taskName: '',
    description: '',
    addedBy: '',
    assignedTo: '',
    status: 'pending',
  });

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEdit(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    switch (filterOption) {
      case 'inProgress':
        return tasks.filter(task => task.status === 'in progress');
      case 'completed':
        return tasks.filter(task => task.status === 'completed');
      case 'pending':
        return tasks.filter(task => task.status === 'pending');
      default:
        return tasks; // 'all'
    }
  }, [filterOption, tasks]);

  const handleOpenDialog = () => {
    setCurrentTask({
      id: null,
      taskName: '',
      description: '',
      addedBy: '',
      assignedTo: '',
      status: 'pending',
    });
    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      setTasks(prev => prev.map(task => (task.id === currentTask.id ? currentTask : task)));
    } else {
      setTasks(prev => [
        ...prev,
        { id: Date.now(), ...currentTask }, // Use Date.now() for a unique ID
      ]);
    }
    handleCloseDialog();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '90%',
        margin: '0 auto',
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        sx={{
          position: 'fixed',
          top: '20px',
          right: '20px',
        }}
      >
        Add Task
      </Button>

      <Box sx={{ margin: '20px' }}>
        <Button variant="outlined" onClick={() => setFilterOption('all')}>All</Button>
        <Button variant="outlined" onClick={() => setFilterOption('inProgress')} style={{ marginLeft: '8px' }}>In Progress</Button>
        <Button variant="outlined" onClick={() => setFilterOption('completed')} style={{ marginLeft: '8px' }}>Completed</Button>
        <Button variant="outlined" onClick={() => setFilterOption('pending')} style={{ marginLeft: '8px' }}>Pending</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell>Added By</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TaskRow key={task.id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TaskDialog
        open={openDialog}
        onClose={handleCloseDialog}
        task={currentTask}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEdit={isEdit}
 />
    </Box>
  );
};

export default TaskTable;