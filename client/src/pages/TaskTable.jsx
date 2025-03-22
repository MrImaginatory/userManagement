// src/TaskTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';

import { useAuth } from '../AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    _id: null,
    taskName: '',
    taskDescription: '',
    taskAddedBy: '',
    taskAssignedTo: '',
    taskStatus: 'Pending',
  });

  const { logout } = useAuth(); // Get the logout function from AuthContext
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/task/get');
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleStatusFilter = (status) => setStatusFilter(status);
  const handleDialogOpen = (task = null) => {
    if (task) {
      setTaskDetails(task);
    } else {
      setTaskDetails({
        _id: null,
        taskName: '',
        taskDescription: '',
        taskAddedBy: '',
        taskAssignedTo: '',
        taskStatus: 'Pending',
      });
    }
    setDialogOpen(true);
  };
  const handleDialogClose = () => setDialogOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { _id, ...newTask } = taskDetails;

    try {
      if (_id) {
        const response = await axios.patch(`http://localhost:5001/task/updateTask/${_id}`, newTask);
        setTasks((prev) => prev.map((task) => (task._id === _id ? response.data : task)));
      } else {
        const response = await axios.post('http://localhost:5001/task/add', newTask);
        setTasks((prev) => [...prev, response.data]);
      }
      handleDialogClose();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/task/deleteTask/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.taskName.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter ? task.taskStatus === statusFilter : true;
    return matchesName && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return { color: 'red' };
      case 'In_Progress':
        return { color: 'yellow' };
      case 'Completed':
        return { color: 'green' };
      default:
        return {};
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to the login page
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center " alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        style={{ position: 'absolute', top: '5%', right: '1%' }} // Position the logout button
      >
        Logout
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
        Add Task
      </Button>
      <TextField
        label="Filter by Task Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={handleFilterChange}
      />
      <Box display="flex" justifyContent="center" marginBottom="20px">
        {['', 'Pending', 'In_Progress', 'Completed'].map((status) => (
          <Button
            key={status}
            variant="contained"
            onClick={() => handleStatusFilter(status)}
            style={{ marginRight: '10px' }}
          >
            {status || 'All'}
          </Button>
        ))}
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Added By</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskName}</TableCell>
                <TableCell>{task.taskDescription}</TableCell>
                <TableCell>{task.taskAddedBy}</TableCell>
                <TableCell>{task.taskAssignedTo}</TableCell>
                <TableCell style={getStatusColor(task.taskStatus)}>{task.taskStatus}</TableCell>
                <TableCell sx={{padding:'0 5px'}}>
                  <Button variant="contained" color="primary" onClick={() => handleDialogOpen(task)}>
                    Update
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{taskDetails._id ? 'Update Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          {['taskName', 'taskDescription', 'taskAddedBy', 'taskAssignedTo'].map((field) => (
            <TextField
              key={field}
              label={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              variant="outlined"
              fullWidth
              margin="normal"
              name={field}
              value={taskDetails[field]}
              onChange={handleInputChange}
              required
            />
          ))}
          <RadioGroup
            name="taskStatus"
            value={taskDetails.taskStatus}
            onChange={handleInputChange}
            row
          >
            {['Pending', 'In_Progress', 'Completed'].map((status) => (
              <FormControlLabel key={status} value={status} control={<Radio />} label={status} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="grey">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {taskDetails._id ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskTable;