import style from "./StaffSignup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffSignup } from "../../features/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input,Label,Button,Form,FormGroup} from "reactstrap";
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
    <div>
      <h1 class = "pb-10">Welcome To Staff Signup</h1>
      <div>
      <Form onSubmit={signupHandler}>
        <FormGroup>
          <Label class = "d-block" htmlFor="name">Name</Label>
          <Input
            type="text"
            className="w-50 m-auto text-center h-100"
            name="name"
            placeholder="Enter your name here"
            value={userDetail.name}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, name: e.target.value })
            }
          />
          </FormGroup>
          {' '}
        
        <FormGroup>
          <Label class = "d-block" htmlFor="email">Email</Label>
          <Input
            type="email"
            className="w-50 m-auto text-center h-100"
            name="email"
            placeholder = "Enter your email here"
            value={userDetail.email}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, email: e.target.value })
            }
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label class = "d-block" htmlFor="password">Password</Label>
          <Input
            type="password"
            className="w-50 m-auto text-center h-100"
            name="password"
            placeholder = "Enter your password here"
            value={userDetail.password}
            required
            onChange={(e) =>
              setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
        </FormGroup>
        {' '}
        <div>
          <Button className={style.loginBtn}>SIGNUP</Button>
          
        </div>
        <p>
          Already a user?{" "}
          <Link to="/staffLogin" className={style.signup}>
            Login
          </Link>{" "}
        </p>
      </Form>
      </div>
    </div>
  );
}