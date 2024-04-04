// routes.js
const express = require("express");
const connection = require("./Db");
const router = express.Router();
const controller = require("./controller");

// Define route handlers using router.route()
router
  .route("/tasks")
  // Get All Tasks
  .get(controller.AllTask)
  // Create New Task
  .post(controller.CreateTask);

router
  .route("/tasks/:id")
  // Update A Task
  .put(controller.UpdateTask)
  //  Delete A Task
  .delete(controller.DeleteTask);

router
     .route("/login")
     // login
     .post(controller.Login)

router
     .route("/logout")
     // login
     .get(controller.Logout)    

module.exports = router;
