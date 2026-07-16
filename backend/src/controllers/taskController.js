import mongoose from "mongoose";
import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (Title, Description, and Due Date)",
      });
    }

    const taskData = {
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
    };

    const task = await createTaskService(taskData);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTasks = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    const tasks = await getTasksService(req.user.id, search, status); 

    res.status(200).json({
      success: true,
      totalTasks: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
    };

    const updatedTask = await updateTaskService(taskId, req.user.id, updateData); 

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Task ID format",
      });
    }

    await deleteTaskService(taskId, req.user.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};