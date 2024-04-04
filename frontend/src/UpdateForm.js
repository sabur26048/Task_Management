import { useState } from "react";
// import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { options, statusOptions } from "./constants";

export const UpdateForm = () => {
  // const [newTask, setNewTask] = useState({
  // //   title: "",
  // //   description: "",
  // //   priority: "",
  // // });
  const [error, setError] = useState("");

  const location = useLocation();
  const taskData = location.state;
  const [newTask, setNewTask] = useState(taskData);

  // useEffect(() => {
  //   console.log("hii")
  //   setNewTask(taskData);
  // }, [taskData]);

  const navigate = useNavigate();

  const updateTask = async () => {
    await fetch(process.env.REACT_APP_api_base + "/tasks/" + newTask.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/",{state : true});
      } else {
        const response = res.json();
        response.then((result) => {
          setError(result.error);
        });
      }
    });
  };

  const updateTodo = (key, value) => {
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
            onChange={(e) => updateTodo("title", e.target.value)}
            value={newTask.title}
          />
        </div>
        <div className="input-group">
          <h3>Description</h3>
          <input
            placeholder="Task Description"
            type="text"
            className="add-todo-input"
            onChange={(e) => updateTodo("description", e.target.value)}
            value={newTask.description}
          />
        </div>
        <div className="input-group">
          <h3>Priority</h3>
          <select
            placeholder="Task Priority"
            value={newTask.priority}
            className="add-todo-input"
            onChange={(e) => updateTodo("priority", e.target.value)}
          >
            <option value="">Task Priority</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
