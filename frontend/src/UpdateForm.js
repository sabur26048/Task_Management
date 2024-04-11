import { useState } from "react";
// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { options, statusOptions } from "./constants";

export const UpdateForm = () => {
  const [error, setError] = useState("");

  const location = useLocation();
  const taskData = location.state;
  const [newTask, setNewTask] = useState(taskData);

  const navigate = useNavigate();

  const updateTask = async () => {
    alert("Task updated successfully")
        navigate("/",{state : true});
  };

  const updateTodo = (key, value) => {
    setNewTask({ ...newTask, [key]: value });
  };

  return (
    <div className="App">
      <h4>Update the Task</h4>
      <div className="content">
        <div className="input-group">
          <h3>Title</h3>
          <input
            type="text"
            placeholder="Task title"
            className="add-todo-input"
            onChange={(e) => updateTodo("title", e.target.value)}
            value={newTask.title}
          />
        </div>
        <div className="input-group">
          <h3>Status</h3>
          <select
            placeholder="Task Priority"
            value={newTask.status}
            className="add-todo-input"
            onChange={(e) => updateTodo("status", e.target.value)}
          >
            <option value="">Task Status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button" onClick={() => updateTask()}>
        Update Task
      </div>
      <div>
        <div className="error">{error}</div>
      </div>
    </div>
  );
};
