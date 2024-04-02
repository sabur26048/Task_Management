import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { statusOptions } from "./constants";
import { FaArrowDownLong } from "react-icons/fa6";

function Home() {
  const [todos, setTodos] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    GetTodos();
  }, []);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredTask(todos);
    } else {
      const filtered = todos.filter((todo) => todo.status === statusFilter);
      setFilteredTask(filtered);
    }
  }, [todos, statusFilter]);

  const GetTodos = () => {
    fetch(process.env.REACT_APP_api_base + "/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (todo) => {
    await fetch(process.env.REACT_APP_api_base + "/tasks/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        status: "Done",
      }),
    }).then((res) => res.json());

    setTodos((todos) =>
      todos.map((todoItem) => {
        if (todoItem.id === todo.id) {
          todoItem.status = "Done";
        }
        return todoItem;
      })
    );
  };

  const deleteTodo = async (id) => {
    await fetch(process.env.REACT_APP_api_base + "/tasks/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    GetTodos();
  };

  const handleSort = () => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTask = [...filteredTask].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setFilteredTask(sortedTask);
  };

  return (
    <div className="App">
      <div className="heading">
        <h4 style={{ flex: 3, textTransform: "none" }}>Your Tasks</h4>
        <h4 style={{ flex: 1, textTransform: "none" }}>
          <span>Priority</span>
          <FaArrowDownLong
            className="action-button "
            color="#ffffff"
            size="20px"
            style={{ paddingTop: "5px" }}
            onClick={() => handleSort()}
          />
        </h4>
        <h4 style={{ flex: 1, textTransform: "none" }}>
          <span>Status</span>
          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option key="All" value="All">
              All
            </option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </h4>
      </div>

      <div className="todos">
        {filteredTask.length > 0 ? (
          filteredTask.map((todo) => (
            <div
              className={
                "todo" + (todo.status === "Done" ? " is-complete" : "")
              }
              key={todo.id}
            >
              <div
                className="checkbox"
                onClick={() => completeTodo(todo)}
              ></div>

              <div className="text">
                <div className="text">{todo.title}</div>
                <div className="text-description">{todo.description}</div>
              </div>
              <div className="text-priority">{todo.priority}</div>
              <div className="text-priority">{todo.status}</div>

              <div className="actions">
                <GrEdit
                  className="action-button"
                  size="20px"
                  onClick={() => navigate("/update", { state: todo })}
                />
                <RiDeleteBinLine
                  color="#ff0000"
                  className="action-button"
                  size="20px"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => navigate("/form")}>
        + Add
      </div>
    </div>
  );
}

export default Home;
