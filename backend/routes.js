// routes.js
const express = require("express");
const connection = require("./Db");
const router = express.Router();

// Define route handlers using router.route()
router
  .route("/tasks")
  // Get All Tasks
  .get(async (req, res) => {
    let sql = "SELECT * FROM tasks";
    connection.query(sql, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ error: "Error in getting data from database" });
      res.status(200).json(result);
    });
  })
  // Create New Task
  .post((req, res) => {
    const { title, description, priority } = req.body;
    // input validation
    if (!title || !description || !priority) {
      return res.status(400).json({ error: "All inputs are required" });
    }

    // Insert data into MySQL database
    connection.query(
      "INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)",
      [title, description, priority, "To Do"],
      (error, results, fields) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error inserting data into database" });
        }
        res.status(201).json({
          message: "Data inserted successfully",
          userId: results.insertId,
        });
      }
    );
  });

router
  .route("/tasks/:id")
  // Update A Task
  .put(async (req, res) => {
    const taskId = req.params.id;
    const { title, description, priority, status } = req.body;
    // input validation
    if (!title || !description || !priority || !status) {
      return res
        .status(400)
        .json({ error: "All inputs are required for update" });
    }

    // Update data in MySQL database
    connection.query(
      "UPDATE tasks SET title = ?, description = ? , priority = ? , status = ? WHERE id = ?",
      [title, description, priority, status, taskId],
      (error, results, fields) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error updating data in database" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });
      }
    );
  })
  //  Delete A Task
  .delete(async (req, res) => {
    const taskId = req.params.id;
    if (!taskId) res.status(500).json({ error: "Invalid Task" });
    // Delete data from MySQL database
    connection.query(
      "DELETE FROM tasks WHERE id = ?",
      [taskId],
      (error, results, fields) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error deleting data from database" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
      }
    );
  });

module.exports = router;
