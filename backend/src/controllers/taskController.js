const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { description, dueDate, status = 'pending' } = req.body; // Default status is 'pending'
    const task = new Task({
      userId: req.user.userId,
      description,
      dueDate,
      status, // Include status in task creation
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const getTasks = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for today's date to ignore time component
    
    // Fetch tasks due today or overdue (tasks whose dueDate is less than or equal to today)
    const tasks = await Task.find({
      userId: req.user.userId,
      dueDate: { $lte: today }, // Match tasks with dueDate <= today
    });
    
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log full error
    res.status(500).json({ message: "Error fetching tasks", error: error.message || error });
  }
};



const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, dueDate, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { description, dueDate, status },
      { new: true } // Return the updated document
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

const filterTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00 for today's date

    // Filter tasks based on status and due date (tasks that are due today or overdue)
    const tasks = await Task.find({
      userId: req.user.userId,
      status,
      dueDate: { $lte: today }, // Match tasks with dueDate <= today
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error filtering tasks", error });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  filterTasks,
};
