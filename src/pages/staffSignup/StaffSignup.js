import style from "./StaffSignup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffSignup } from "../../features/index";
import { toast } from "react-toastify";

export function StaffSignup() {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staffDetail } = useSelector((store) => store.staffAuth);
  const location = useLocation();

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(staffSignup(userDetail)).then((res) => {
      if (res.error) {
        // toast.error("Enter the correct credentials");
      } else {
        let from = location.state?.from?.pathname || "/staffPortalHome";
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <div className={style.loginPage}>
      <h1>Welcome To Staff Signup</h1>
      <form className={style.form} onSubmit={signupHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetail.name}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, name: e.target.value })
            }
          />
        </div>
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
          <button className={style.loginBtn}>SIGNUP</button>
          <br />
        </div>
        <p className={style.signupLine}>
          Already a user?{" "}
          <Link to="/staffLogin" className={style.signup}>
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}