import style from "./StudentSignup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentSignup } from "../../features/index";
import {Input,Label,Button,Form,FormGroup} from "reactstrap";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export function StudentSignup() {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [userDetailError, setUserDetailError] = useState(false);
  const [userEmailDetail,setUserEmailDetail] = useState(false);
  const [userPassword,setUserPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { studentDetail, error } = useSelector((store) => store?.studentAuth);

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(studentSignup({userDetail})).then((res) => {
      if (res.error) {
        // toast.error("Enter the correct credentials");
      } else {
        let from = location.state?.from?.pathname || "/studentPortalHome";
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
  // const userEmailHandler = (e)=>{
  //   const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   const email = e.target.value;
  //   // setUserDetail({ ...userDetail, email: e.target.value })
  //   if(re.test(email)){
  //     setUserEmailDetail(false)
  //     setUserDetail({ ...userDetail, email: e.target.value })
  //     return
  //   }
  //   setUserEmailDetail(true);

  // }
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
     <h1>Welcome To Student Signup</h1>
     <div className="mt-20">
      <Form onSubmit={signupHandler}>

        <FormGroup className="display-content-column">
          <Label className= "d-block">Name</Label>
          <Input
            type="text"
            className = "w-50 m-auto text-center h-100"
            name="name"
            value={userDetail.name}
            placeholder="Enter your name here"
            required
            onChange={(e) =>
              userNameHandler(e)
              
            }
          />
          {console.log(userDetailError)}
          { userDetailError && (
            <small className="h6 text-blue">Username Cannot have Special Character</small>
          ) }
        </FormGroup>
        {' '}
        <FormGroup>
          <Label class = "d-block" htmlFor="email">Email</Label>
          <Input
            type="email"
            className = "w-50 m-auto text-center h-100"
            name="email"
            value={userDetail.email}
            placeholder="Enter your email here"
            required
            onChange={(e) =>
              // userEmailHandler(e)
              setUserDetail({ ...userDetail, email: e.target.value })
            }
          />
          { 
           userEmailDetail && (
            <small className = "h6">Email Cannot have Special Character</small>
           )
          }
        </FormGroup>
        {' '}
        <FormGroup>
          <Label className = "d-block" htmlFor="password">Password</Label>
          <Input
            type="password"
            className="w-50 m-auto text-center h-100"
            name="password"
            value={userDetail.password}
            placeholder="Enter your password here"
            required
            onChange={(e) =>
               userPasswordHandler(e)
              
            }
          />
          {
            userPassword && (
              <small className = "h6">Password must have 8 characters</small>
            )
          }
        </FormGroup>
      
          <Button>SIGNUP</Button>
        
        <p class = "mt-20">
          Already a user?{" "}
          <Link to="/studentLogin">
            Login
          </Link>{" "}
        </p>
      </Form>
      </div>
    </div>
  );
}