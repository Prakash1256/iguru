import React from "react";
import { Box, Typography, IconButton, Button, ListItem, Grid } from "@mui/material";
import { Edit } from "@mui/icons-material";

const TaskItem = ({ task, handleEditTask, handleDeleteTask }) => {
  return (
    <ListItem
      key={task._id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
        borderBottom: "1px solid #ddd",
        pb: 1,
        flexDirection: { xs: "column", sm: "row" }, // Stack on small screens
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, flex: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {task.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Due: {task.dueDate} | Status:{" "}
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: { xs: "center", sm: "flex-start" } }}>
        <IconButton onClick={() => handleEditTask(task)} color="primary" sx={{ minWidth: "40px" }}>
          <Edit />
        </IconButton>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteTask(task._id)}
          sx={{ minWidth: "80px" }}
        >
          Delete
        </Button>
      </Box>
    </ListItem>
  );
};

export default TaskItem;
