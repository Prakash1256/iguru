import React from "react";
import { List, Typography, Paper } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
  return (
    <Paper sx={{ p: 3, boxShadow: 3, width: "80%", margin: "auto", marginTop: "30px" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Task List
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Total Tasks: {tasks.length}
      </Typography>
      <List sx={{ padding: 0 }}>
        {tasks &&
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
      </List>
    </Paper>
  );
};

export default TaskList;
