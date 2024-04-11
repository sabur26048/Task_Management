import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { options, statusOptions } from "./constants";

export const Form = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const addTask = async () => {
       if(newTask.title=="")
       setError("Title can not empty")
      if(newTask.status==="Completed" || newTask.status==="Not completed")
       {alert("Task added successfully")
        navigate("/",{state : true});}
       else setError("please select status") 
  };

  const updateTask = (key, value) => {
    setNewTask({ ...newTask, [key]: value });
  };

  return (
    <div className="App">
      <h4>Create New Task</h4>
      <div className="content">
        <div className="input-group">
          <h3>Title</h3>
          <input
            type="text"
            placeholder="Task title"
            className="add-todo-input"
            onChange={(e) => updateTask("title", e.target.value)}
            value={newTask.title}
          />
        </div>
        <div className="input-group">
          <h3>Status</h3>
          <select
            placeholder="Task Priority"
            value={newTask.priority}
            className="add-todo-input"
            onChange={(e) => updateTask("priority", e.target.value)}
          >
            <option value="">Select an option</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="button" onClick={addTask}>
        Create Task
      </div>
      <div>
        <div className="error">{error}</div>
      </div>
    </div>
  );
};
