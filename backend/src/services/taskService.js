import Task from "../models/Task.js";

export const createTaskService = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

export const getTasksService = async (userId, search, status) => {
  let queryObject = { user: userId };

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }
  if (status) {
    queryObject.status = status;
  }

  const tasks = await Task.find(queryObject);
  return tasks;
};

export const updateTaskService = async (taskId, userId, updateData) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw { status: 404, message: "Task not found" };
  }

  if (task.user.toString() !== userId) {
    throw { status: 401, message: "Not authorized to update this task" };
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  return updatedTask;
};

export const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw { status: 404, message: "Task not found" };
  }

  if (task.user.toString() !== userId) {
    throw { status: 401, message: "Not authorized to delete this task" };
  }

  await task.deleteOne();
  return true;
};