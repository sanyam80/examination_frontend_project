
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./StudentLogin.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentLogin } from "../../features/index";

import { toast } from "react-toastify";
import {Input,Label,Button,Form,FormGroup} from "reactstrap";

export function StudentLogin() {
  const [userDetail, setUserDetail] = useState({ email: null, password: null });
  const { studentDetail, error } = useSelector((store) => store.studentAuth);
  const [userEmailDetail,setUserEmailDetail] = useState(false);
  const [userPassword,setUserPassword] = useState(false);
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
  const userEmailHandler = (e)=>{
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const email = e.target.value;
    setUserDetail({ ...userDetail, email: e.target.value })
    if(re.test(email)){
      setUserEmailDetail(false)
      setUserDetail({ ...userDetail, email: e.target.value })
      return
    }
    setUserEmailDetail(true);

  }
//   const userPasswordHandler = (e)=>{
//     setUserDetail({ ...userDetail, password: e.target.value });
//     if (e.target.value?.length < 8) {
//       setUserPassword(true)
//     } else {
//       setUserPassword(false)
//     }
// }

  return (
    <div>
      <h2>Welcome To Student Login</h2>
      <div class= "shadow-lg p-2 m-5 bg-white rounded">
      <Form onSubmit={loginHandler}>
        <FormGroup>
          <Label htmlFor="email" className = "d-block">Email</Label>
          <Input
            type="email"
            className="w-50 m-auto text-center h-100"
            name="email"
            value={userDetail.email}
            placeholder = "Enter your email here"
            required
            onChange={(e) =>
              userEmailHandler(e)
              // setUserDetail({ ...userDetail, email: e.target.value })
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
          <Label htmlFor="password" className = "d-block">Password</Label>
          <Input
            type="password"
            name="password"
            className="w-50 m-auto text-center h-100"
            value={userDetail.password}
            placeholder = "Enter your password here"
            required
            onChange={(e) =>
              // userPasswordHandler(e)
              setUserDetail({ ...userDetail, password: e.target.value })
            }
          />
          {
            
              userPassword && (
                <small className = "h6">Password must have 8 characters</small>
              )
            
          }
        </FormGroup>
        {' '}
         <Button className = "h-100 w-20">LOGIN</Button>
          <p className = "pt-100">
          New here?{" "}
          <Link to="/studentSignup">
            Signup
          </Link>{" "}
        </p>
      </Form>
      </div>
    </div>
  );
}