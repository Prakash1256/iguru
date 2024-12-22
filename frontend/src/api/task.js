import axios from "axios";

const API_URL = "http://localhost:4400/api/tasks";

// Fetch all tasks
export const getTasks = async (token) => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Create a new task
export const createTask = async (task, token) => {
  return axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Delete a task
export const deleteTask = async (id, token) => {
  return axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update a task
export const updateTask = async (id, task, token) => {
  return axios.put(`${API_URL}/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Filter tasks by status
export const filterTasks = async (status, token) => {
  return axios.get(`${API_URL}/filter?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
