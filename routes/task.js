const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const bodyparser = require("body-parser");

// checking, for server error

router.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome",
  });
});

router.post("/v1/create", async (req, res) => {
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
router.get("/v1/all", async (req, res) => {
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

router.get("/v1/single/:id", async (req, res) => {
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

router.delete("/v1/delete/:id", async (req, res) => {
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
router.put("/v1/edit/:id", async (req, res) => {
  try {
    let task = await Task.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({
      error: "There is no task at that id",
    });
  }
});

router.delete("/v1/deletemany", async (req, res) => {
  try {
    let ids = [];
    let deletingIds = req.body.tasks.map((obj) => {
      ids.push(obj.id);
    });
    // console.log(deletingIds);
    let tasks = await Task.deleteMany({ _id: { $in: ids } });
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
