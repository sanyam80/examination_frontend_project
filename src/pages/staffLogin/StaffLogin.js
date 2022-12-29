import style from "./StaffLogin.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { staffLogin } from "../../features/index";
import { toast } from "react-toastify";
import {Input,Label,Button,Form,FormGroup} from "reactstrap";

export function StaffLogin() {
  const [userDetail, setUserDetail] = useState({ email: null, password: null });
  const { staffDetail } = useSelector((store) => store.staffAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(staffLogin(userDetail)).then((res) => {
      if (res.error) {
        // toast.error("Enter the correct credentials");
      } else {
        let from = location.state?.from?.pathname || "/staffPortalHome";
        navigate(from, { replace: true });
      }
    });
  };

  return (
    <div>
      <h1 className="p-20">Welcome To Staff Login</h1>
      <div>
      <Form onSubmit={loginHandler}>
        <div>
          <Label className = "d-block" htmlFor="email">Email</Label>
          <Input
            type="email"
            className="w-50 m-auto mb-10 text-center h-100"
            name="email"
            placeholder="Enter your email here"
            value={userDetail.email}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, email: e.target.value })
            }
          />
        </div>
        <div>
          <Label className = "d-block" htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            className="w-50 m-auto text-center h-100"
            placeholder = "Enter your password here"
            value={userDetail.password}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
        </div>
        
          <Button>LOGIN</Button>
          
        
        <p className={style.signupLine}>
          New here?{" "}
          <Link to="/staffSignup" className={style.signup}>
            Signup
          </Link>{" "}
        </p>
        
      </Form>
      </div>
    </div>
  );
}