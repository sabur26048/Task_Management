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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => {
         settasks([...filteredTask, ...data]);
         setLoading(false);
      })
    };

    loadTodos();
  }, [page]);


  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const Gettasks = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`)
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
    if(task.completed===false){
    settasks((tasks) =>
      tasks.map((taskItem) => {
        if (taskItem.id === task.id) {
            taskItem.status = "Done";
        }
        return taskItem;
      })
    );
 } };

  const deletetask = async (id) => {
   const temp= tasks.filter((taskItem) => {
          return taskItem.id === id?false:true;
    })
    settasks(temp)
  };

  const logout= async ()=>{
   setLogin(false);
      
  }

  const about=(task)=>{
    navigate("/about", { state:"This about task" })
  }

  return (
    <div className="App">
      <div className= "new" >
        {login?<p onClick={() => logout()}>{`Logout/${user}`}</p>:''}
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

              <div className="text" onClick={()=>about(task)}>
                <div className="text" >{task.title}</div>
                <div className="text-description" >this is task description</div>
              </div>

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
