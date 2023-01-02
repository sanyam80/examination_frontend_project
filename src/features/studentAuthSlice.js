import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  status: "idle",
  studentDetail: JSON.parse(localStorage.getItem("studentDetail")),
  error: null,
};

const studentSignup = createAsyncThunk(
  "studentAuth/signup",
  async (studentDetail) => {
    // console.log(studentDetail)
    try {
      const response = await axios.post("student/", studentDetail);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const studentLogin = createAsyncThunk(
  "studentAuth/login",
  async (studentDetail) => {
    const response = await axios.get("student/");
    const data = response.data;
    for (let i of data) {
      if (
        i.email === studentDetail.email &&
        i.password === studentDetail.password
      ) {
        return i;
      }
    }
    return await axios.get("anythingToReject");
  }
);

const studentAuthSlice = createSlice({
  name: "studentAuth",
  initialState,
  reducers: {
    studentLogout: (state) => {
      state.status = "idle";
      state.studentDetail = null;
      state.error = null;
      localStorage.removeItem("studentDetail");
      toast.success("Successfully Logged Out");
    },
  },
  extraReducers: {
    [studentSignup.pending]: (state) => {
      state.status = "loading";
    },
    [studentSignup.fulfilled]: (state, action) => {
      state.status = "success";
      state.studentDetail = action.payload;
      localStorage.setItem("studentDetail", JSON.stringify(action.payload));
      toast.success("Signup Successful");
    },
    [studentSignup.rejected]: (state, action) => {
      state.status = "failure";
      state.error = action.payload.error;
      toast.error(`${state.error.message}. Please try again later.`);
    },
    [studentLogin.pending]: (state) => {
      state.status = "loading";
    },
    [studentLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.studentDetail = action.payload;
      localStorage.setItem("studentDetail", JSON.stringify(action.payload));
      console.log(action.payload);
      toast.success("Welcome To Student Portal");
    },
    [studentLogin.rejected]: (state, action) => {
      state.status = "failure";
      state.error = action.error;
      console.log("Enter the correct credentials");
      toast.error("Enter the correct credentials");
    },
  },
});

export const studentAuthReducer = studentAuthSlice.reducer;
export const { studentLogout } = studentAuthSlice.actions;
export { studentLogin, studentSignup };