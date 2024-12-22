import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  filterTasks,
} from "../api/task";
import FilterSection from "../components/FilterSection";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { auth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let taskData;
        if (filterStatus) {
          taskData = await filterTasks(filterStatus, auth.token);
        } else {
          taskData = await getTasks(auth.token);
        }

        if (taskData && taskData.data) {
          if (filterDueDate === "dueTodayOrOverdue") {
            taskData.data = taskData.data.filter((task) => {
              const dueDate = new Date(task.dueDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return dueDate <= today;
            });
          }

          setTasks(taskData.data);
        } else {
          console.error("Task data is invalid or undefined");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [auth.token, filterStatus, filterDueDate]);

  const handleAddTask = async () => {
    try {
      const { data } = await createTask(newTask, auth.token);
      setTasks([...tasks, data]);
      setNewTask({ description: "", dueDate: "", status: "pending" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, auth.token);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });
  };

  const handleUpdateTask = async () => {
    try {
      const { data } = await updateTask(editingTask._id, newTask, auth.token);
      setTasks(
        tasks.map((task) => (task._id === editingTask._id ? data : task))
      );
      setEditingTask(null);
      setNewTask({ description: "", dueDate: "", status: "pending" });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterDueDateChange = (event) => {
    setFilterDueDate(event.target.value);
  };

  return (
    <div>
      <FilterSection
        filterStatus={filterStatus}
        filterDueDate={filterDueDate}
        onFilterStatusChange={handleFilterStatusChange}
        onFilterDueDateChange={handleFilterDueDateChange}
      />
      <TaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
        handleUpdateTask={handleUpdateTask}
        editingTask={editingTask}
      />
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;
