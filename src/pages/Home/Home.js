import style from "./Home.module.css";
import { useEffect } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export const Home = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get("students/");
  //     console.log(response);
  //   })();
  // }, []);
  return (
    <div className={style.home}>
      <div className = {style.home_header}><h1>Welcome To Online Examination Portal</h1></div>
      <div className={style.users}>
        <Link className = {style.link} to="/studentLogin">
         <h1>Student Login</h1> 
        </Link>
        <Link className = {style.link} to="/staffLogin">
          <h1>Staff Login</h1> 
        </Link>
      </div>
    </div>
  );
};