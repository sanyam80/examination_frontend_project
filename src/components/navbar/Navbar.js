import style from "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentLogout, staffLogout } from "../../features/index";
import { useEffect, useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentDetail } = useSelector((store) => store?.studentAuth);
  const { staffDetail } = useSelector((store) => store?.staffAuth);
  const [name, setName] = useState("");

  const logoutHandler = () => {
    if (localStorage.getItem("studentDetail")) {
      dispatch(studentLogout());
    } else {
      dispatch(staffLogout());
    }
    navigate("/");
  };

  useEffect(() => {
    const obj1 =
      studentDetail ?? JSON.parse(localStorage.getItem("studentDetail"));
    const obj2 = staffDetail ?? JSON.parse(localStorage.getItem("staffDetail"));
    if (obj1) {
      setName(obj1?.name);
    } else {
      setName(obj2?.name);
    }
  }, [studentDetail]);

  return (
    <nav className={style.navContainer}>
      <p>Online Examinaton Portal</p>
      <div className={style.right}>
        {/* <p className="">Student Status</p> */}
        <p>Welcome {name}</p>
        <p onClick={logoutHandler} className={style.logoutBtn}>
          Logout
        </p>
      </div>
    </nav>
  );
}