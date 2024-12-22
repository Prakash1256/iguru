import React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const STATUS_ENUM = ["pending", "completed"];

const TaskForm = ({ newTask, setNewTask, handleAddTask, handleUpdateTask, editingTask }) => {
  return (
    <Paper sx={{ p: 3, mb: 4, boxShadow: 3, width: { xs: "100%", sm: "80%" }, margin: "auto", marginTop: "30px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {editingTask ? "Edit Task" : "Create New Task"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              label="Status"
            >
              {STATUS_ENUM.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={editingTask ? handleUpdateTask : handleAddTask}
            sx={{ height: "100%", width: "100%" }}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TaskForm;
