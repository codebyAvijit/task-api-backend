const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const bodyparser = require("body-parser");

// checking, for server error

router.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Task API.",
  });
});

router.post("/v1/tasks", async (req, res) => {
  try {
    if (req.body.tasks) {
      let tasks = await Task.insertMany(req.body.tasks);
      let result = tasks.map((obj) => {
        return { id: obj._id };
      });
      res.status(201).json({
        tasks: result,
      });
    } else {
      let task = await Task.create(req.body);
      res.status(201).json({
        id: task._id,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});
router.get("/v1/tasks", async (req, res) => {
  try {
    let tasks = await Task.find();
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

router.get("/v1/tasks/:id", async (req, res) => {
  try {
    let task = await Task.find({ _id: req.params.id });
    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
});

router.delete("/v1/tasks/:id", async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete({ _id: req.params.id });
    res.status(204).json({
      task,
    });
  } catch (error) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
});
router.put("/v1/tasks/:id", async (req, res) => {
  try {
    let task = await Task.updateOne(
      { id: req.params.id },
      { $set: { title: req.body.title, is_completed: req.body.is_completed } }
    );
    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
});

router.delete("/v1/tasks", async (req, res) => {
  try {
    let deletingIds = req.body.tasks.map((obj) => {
      return obj.id;
    });
    console.log(deletingIds);
    let tasks = await Task.deleteMany({ _id: { $in: deletingIds } });
    res.status(204).json({
      status: "Success",
      message: "Tasks deleted successfully",
      tasks,
    });
  } catch (error) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
});

module.exports = router;
