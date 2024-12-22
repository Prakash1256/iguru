const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Create a Task
router.post('/', verifyToken, async (req, res) => {
  const { description, dueDate } = req.body;
  const task = new Task({
    description,
    dueDate,
    userId: req.user.userId,
  });
  await task.save();
  res.status(201).json(task);
});

// Get Tasks
router.get('/', verifyToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

// Update a Task
router.put('/:id', verifyToken, async (req, res) => {
  const { description, dueDate } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { description, dueDate }, { new: true });
  res.json(task);
});

// Delete a Task
router.delete('/:id', verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted successfully' });
});

// Filter Tasks
router.get('/filter', verifyToken, async (req, res) => {
  const { status } = req.query;
  const filter = status === 'today' ? { dueDate: new Date().toISOString().slice(0, 10) } :
                status === 'overdue' ? { dueDate: { $lt: new Date().toISOString().slice(0, 10) } } :
                {};
  const tasks = await Task.find({ userId: req.user.userId, ...filter });
  res.json(tasks);
});

module.exports = router;
