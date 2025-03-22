import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const TaskTable = () => {
  const [filterOption, setFilterOption] = useState('all');
  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Task 1', description: 'Description for Task 1', addedBy: 'User  A', assignedTo: 'User  B', status: 'pending' },
    { id: 2, taskName: 'Task 2', description: 'Description for Task 2', addedBy: 'User  C', assignedTo: 'User  D', status: 'in progress' },
    { id: 3, taskName: 'Task 3', description: 'Description for Task 3', addedBy: 'User  E', assignedTo: 'User  F', status: 'completed' },
  ]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
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
    setOpenEdit(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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

  const handleOpenAdd = () => {
    setOpenAdd(true);
    setCurrentTask({
      id: null,
      taskName: '',
      description: '',
      addedBy: '',
      assignedTo: '',
      status: 'pending',
    });
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setCurrentTask({
      id: null,
      taskName: '',
      description: '',
      addedBy: '',
      assignedTo: '',
      status: 'pending',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdd = () => {
    setTasks(prev => [
      ...prev,
      { id: Date.now(), ...currentTask }, // Use Date.now() for a unique ID
    ]);
    handleCloseAdd();
  };

  const handleSubmitEdit = () => {
    setTasks(prev => prev.map(task => (task.id === currentTask.id ? currentTask : task)));
    handleCloseEdit();
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
        onClick={handleOpenAdd}
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
              <TableRow key={task.id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.addedBy}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell style={{ color: getStatusColor(task.status) }}>{task.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEdit(task)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(task.id)} style={{ marginLeft: '8px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.taskName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Task Description"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="addedBy"
            label="Added By"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.addedBy}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="assignedTo"
            label="Assigned To"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.assignedTo}
            onChange={handleChange}
          />
          <RadioGroup
            name="status"
            value={currentTask.status}
            onChange={handleChange}
          >
            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
            <FormControlLabel value="in progress" control={<Radio />} label="In Progress" />
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="taskName"
            label="Task Name"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.taskName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Task Description"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="addedBy"
            label="Added By"
            type="text"
            fullWidth
            variant="outlined"
            value={current Task.addedBy}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="assignedTo"
            label="Assigned To"
            type="text"
            fullWidth
            variant="outlined"
            value={currentTask.assignedTo}
            onChange={handleChange}
          />
          <RadioGroup
            name="status"
            value={currentTask.status}
            onChange={handleChange}
          >
            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
            <FormControlLabel value="in progress" control={<Radio />} label="In Progress" />
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskTable;