// build your `/api/tasks` router here
const express = require("express");
const router = express.Router();

const TaskModel = require("./model");

//GET /api/tasks
router.get("/", async (req, res, next) => {
  try {
    const task = await TaskModel.find();
    task.map((task) => {
      task.task_completed = Boolean(task.task_completed);
    });
    return res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

//GET /api/tasks/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

///POST /api/tasks
router.post("/", async (req, res, next) => {
  const taskPost = req.body;
  try {
    const newTask = await TaskModel.add(taskPost);
    console.log("newTask---->", newTask);
    newTask.task_completed = Boolean(newTask.task_completed);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
