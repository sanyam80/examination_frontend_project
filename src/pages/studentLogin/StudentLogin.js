

import style from "./StudentLogin.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "../../features/index";
import { toast } from "react-toastify";

export function StudentLogin() {
  const [userDetail, setUserDetail] = useState({ email: null, password: null });
  const { studentDetail, error } = useSelector((store) => store.studentAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(studentLogin(userDetail)).then((res) => {
      if (res.error) {
        // toast.error("Enter the correct credentials");
      } else {
        let from = location.state?.from?.pathname || "/studentPortalHome";
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <div className={style.loginPage}>
      <h1>Welcome To Student Login</h1>
      <form className={style.form} onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetail.email}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userDetail.password}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
        </div>
        <div>
          <button className={style.loginBtn}>LOGIN</button>
          <br />
        </div>
        <p className={style.signupLine}>
          New here?{" "}
          <Link to="/studentSignup" className={style.signup}>
            Signup
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}