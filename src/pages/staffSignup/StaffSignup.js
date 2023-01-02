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
  const [userDetailError, setUserDetailError] = useState(false);
  const [userEmailDetail,setUserEmailDetail] = useState(false);
  const [userPassword,setUserPassword] = useState(false);
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
  const userNameHandler = (e) => {
    const re=/^[A-Za-z]+$/;
    const name = e.target.value
    
    if (re.test(name)) {
      setUserDetailError(false)
      setUserDetail({ ...userDetail, name: e.target.value })
      console.log(e.target.value);
      return 
    }
    setUserDetailError(true);
  }
  const userPasswordHandler = (e)=>{
    setUserDetail({ ...userDetail, password: e.target.value });
    if (e.target.value?.length < 8) {
      setUserPassword(true)
    } else {
      setUserPassword(false)
    }
}

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
              userNameHandler(e)
              // setUserDetail({ ...userDetail, name: e.target.value })
            }
          />
          { userDetailError && (
            <small className="h6 text-blue">Username Cannot have Special Character</small>
          ) }
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
              userPasswordHandler(e)
              // setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
          {
            userPassword && (
              <small className = "h6">Password must have 8 characters</small>
            )
          }
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