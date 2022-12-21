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
    <main className={style.home}>
      <h1>Welcome To Online Examination Portal</h1>
      <div className={style.users}>
        <Link to="/studentLogin" className={style.loginType}>
          Student Login
        </Link>
        <Link to="/staffLogin" className={style.loginType}>
          Staff Login
        </Link>
      </div>
    </main>
  );
};