import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [error, setError] = useState("");

  const [newTask, setNewTask] = useState({});

  const navigate = useNavigate();

  const login = async () => {
    console.log(newTask)
    await fetch(process.env.REACT_APP_api_base + "/login/" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then((res) => {
      if (res.status === 200) {
        navigate("/",{ state: true});
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
      <h4>Login</h4>
      <div className="content">
        <div className="input-group">
          <h3>Username</h3>
          <input
            type="text"
            placeholder="Username"
            className="add-todo-input"
            onChange={(e) => updateTodo("username", e.target.value)}
          />
        </div>
        <div className="input-group">
          <h3>Password</h3>
          <input
            placeholder="Password"
            type="password"
            className="add-todo-input"
            onChange={(e) => updateTodo("password", e.target.value)}
          />
        </div>
      </div>
      <div className="button" onClick={() => login()}>
        Login
      </div>
      <div>
        <div className="error">{error}</div>
      </div>
    </div>
  );
};
