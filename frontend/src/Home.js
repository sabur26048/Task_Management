import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { statusOptions } from "./constants";
import { FaArrowDownLong } from "react-icons/fa6";

function Home() {
  const [tasks, settasks] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError]=useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const islogin = location.state || false;
  const [login,setLogin]=useState(false)
  const user='sabur';

useEffect(() => {

    setLogin(islogin)
  }, [islogin]);
  useEffect(() => {
    if(login)
    Gettasks();
  else {
      setError("Please Login")
      settasks({})
  }
  }, [error,login]);

  useEffect(() => {
    if(tasks)
   { if (statusFilter === "All") {
      setFilteredTask(tasks);
    } else {
      const filtered = tasks.filter((task) => task.status === statusFilter);
      setFilteredTask(filtered);
    }
  }}, [tasks, statusFilter]);

  const Gettasks = () => {
    fetch(process.env.REACT_APP_api_base + "/tasks")
      .then((res) => res.json())
      .then((data) => {
        if(data.error)
       { setError(data.error)
         setLogin(false)
        settasks({})}
        else settasks(data);
      })
      .catch((err) => 
      { 
        console.log(err)
        setError(err)});
  };

  const completeTask = async (task) => {
    if(task.status!=="Done"){
    await fetch(process.env.REACT_APP_api_base + "/tasks/" + task.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        status: "Done",
      }),
    }).then((res) => res.json());

    settasks((tasks) =>
      tasks.map((taskItem) => {
        if (taskItem.id === task.id) {
            taskItem.status = "Done";
        }
        return taskItem;
      })
    );
   // Gettasks();
 } };

  const deletetask = async (id) => {
    await fetch(process.env.REACT_APP_api_base + "/tasks/" + id, {
      method: "DELETE",
    }).then((res) => res.json());

    Gettasks();
  };

  const handleSort = () => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTask = [...filteredTask].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setFilteredTask(sortedTask);
  };
  const logout= async ()=>{
    await fetch(process.env.REACT_APP_api_base + "/logout/", {
      method: "GET",
    }).then((res) => {res.json()
      Gettasks();
    });
      
  }
  return (
    <div className="App">
      <div className= "new" >
        {login?<p onClick={() => logout()}>{`Logout/${user}`}</p>:''}
      </div>
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
          filteredTask.map((task) => (
            <div
              className={
                "todo" + (task.status === "Done" ? " is-complete" : "")
              }
              key={task.id}
            >
              <div
                className="checkbox"
                onClick={() => completeTask(task)}
              ></div>

              <div className="text">
                <div className="text">{task.title}</div>
                <div className="text-description">{task.description}</div>
              </div>
              <div className="text-priority">{task.priority}</div>
              <div className="text-priority">{task.status}</div>

              <div className="actions">
                <GrEdit
                  className="action-button"
                  size="20px"
                  onClick={() => navigate("/update", { state: task })}
                />
                <RiDeleteBinLine
                  color="#ff0000"
                  className="action-button"
                  size="20px"
                  onClick={() => deletetask(task.id)}
                />
              </div>
            </div>
          ))
        ) : (
          <div>
           {error.length>0 && !login?<p 
           style={{cursor:"pointer"}}
           onClick={() => navigate("/login")}>{error}</p>:<p>You currently have no tasks</p>}</div>
        )}
      </div>
      {login?(<div className="addPopup" onClick={() => navigate("/form")}>
        + Add
      </div>):""}
    </div>
  );
}

export default Home;
