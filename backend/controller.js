const asyncHandler = require("express-async-handler");
const connection = require("./Db");

let Isauthenticate=false;

// Get All Tasks
exports.AllTask = asyncHandler(async (req, res, next) => {
if(Isauthenticate)
  {let sql = "SELECT * FROM tasks";
  connection.query(sql, (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error in getting data from database" });
    res.status(200).json(result);
  });}
  else return res
        .status(500)
        .json({ error: "Please login" });
});

// Create New Task
exports.CreateTask = asyncHandler(async (req, res, next) => {
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

  // Update A Task
  exports.UpdateTask = asyncHandler(async (req, res, next) => {
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
  });

  //  Delete A Task
  exports.DeleteTask = asyncHandler(async (req, res, next) => {
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

  exports.Login= asyncHandler(async (req, res, next) => {
    const { username,password} = req.body;
    if (!username || !password) return res.status(500).json({ error: "Invalid Task" });
    if(username==="sabur" && password==="123")
    {Isauthenticate=true;
    res.status(200).json({ message: "Login" });}
    else res.status(500).json({ error: "Invalid User"})
    // Delete data from MySQL database
    // connection.query(
    //   "SELECT FROM login WHERE username = ? AND password = ?",
    //   [username,password],
    //   (error, results, fields) => {
    //     if (error) {
    //       return res
    //         .status(500)
    //         .json({ error: "Error " });
    //     }
    //     if (results.affectedRows === 0) {
    //         console.log(results.affectedRows)
    //       return res.status(404).json({ error: "User not found" });
    //     }
    //     console.log(results.affectedRows)
    //     res.status(200).json({ message: "User" });
    //   }
    // );
  });
  exports.Logout= asyncHandler(async (req, res, next) => {
     Isauthenticate=false;
     return res.status(200).json({message: "logout successfull"})
  });

  process.on("exit", () => {
     Isauthenticate=false;
  });

module.exports;