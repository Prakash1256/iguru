import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Card, CardContent } from '@mui/material';

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', dueDate: '' });

  useEffect(() => {
    if (token) {
      axios.get('/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setTasks(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  const handleAddTask = async () => {
    try {
      const { data } = await axios.post('/api/tasks', newTask, { headers: { Authorization: `Bearer ${token}` } });
      setTasks([...tasks, data]);
      setNewTask({ description: '', dueDate: '' });
    } catch (err) {
      console.error('Error adding task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Task Input Section */}
      <div className="mb-6 flex flex-col space-y-4">
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          variant="outlined"
          fullWidth
          className="border-gray-300 rounded-lg"
        />
        <div className="flex flex-col sm:flex-row sm:space-x-4 sm:items-center">
          <TextField
            label="Due Date"
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            variant="outlined"
            className="border-gray-300 rounded-lg flex-1"
          />
          <Button
            onClick={handleAddTask}
            variant="contained"
            color="primary"
            className="py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4 sm:mt-0"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task._id} className="shadow-md p-4 rounded-lg">
            <CardContent>
              <h3 className="text-xl font-semibold">{task.description}</h3>
              <p className="text-gray-600">Due Date: {task.dueDate}</p>
              <Button
                onClick={() => handleDeleteTask(task._id)}
                variant="outlined"
                color="secondary"
                className="mt-4 text-red-500 border-red-500 hover:bg-red-100"
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
