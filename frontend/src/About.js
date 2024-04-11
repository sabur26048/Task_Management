import { useNavigate,useLocation } from "react-router-dom";
export const About = ()=>{

    const location = useLocation();
    const navigate = useNavigate();
    const value = location.state;
    const Home=()=>{
        navigate("/", { state:true })
    }
    return (<><div className="about">{value}</div>
    <div><br></br></div>
    <p className="out" onClick={()=>{Home()}}>Go to home</p></>)
}