import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

const STATUS_ENUM = ["pending", "completed"];

const FilterSection = ({ filterStatus, filterDueDate, onFilterStatusChange, onFilterDueDateChange }) => {
  return (
    <Paper sx={{ p: 2, mb: 4, boxShadow: 3, width: { xs: "100%", sm: "80%", md: "60%" }, margin: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filter Tasks
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={onFilterStatusChange}
              label="Status"
            >
              <MenuItem value="">All</MenuItem>
              {STATUS_ENUM.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Due Date</InputLabel>
            <Select
              value={filterDueDate}
              onChange={onFilterDueDateChange}
              label="Due Date"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="dueTodayOrOverdue">Due Today or Overdue</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterSection;
