

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  status: "idle",
  staffDetail: localStorage.getItem("staffDetail"),
  error: null,
};

const staffSignup = createAsyncThunk(
  "staffAuth/signup",
  async (staffDetail) => {
    try {
      console.log(staffDetail);
      const response = await axios.post("staff/", staffDetail);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const staffLogin = createAsyncThunk("staffAuth/login", async (staffDetail) => {
  const response = await axios.get("staff/");
  const data = response.data;
  for (let i of data) {
    if (i.email === staffDetail.email && i.password === staffDetail.password) {
      return i;
    }
  }
  return await axios.get("anythingToReject");
});

const staffAuthSlice = createSlice({
  name: "staffAuth",
  initialState,
  reducers: {
    staffLogout: (state) => {
      state.status = "idle";
      state.staffDetail = null;
      state.error = null;
      localStorage.removeItem("staffDetail");
      toast.success("Successfully Logged Out");
    },
  },
  extraReducers: {
    [staffSignup.pending]: (state) => {
      state.status = "loading";
    },
    [staffSignup.fulfilled]: (state, action) => {
      state.status = "success";
      state.staffDetail = action.payload;
      localStorage.setItem("staffDetail", JSON.stringify(action.payload));
      toast.success("Signup Successful");
    },
    [staffSignup.rejected]: (state, action) => {
      state.status = "failure";
      state.error = action.payload.error;
      toast.error(`${state.error.message}. Please try again later.`);
    },
    [staffLogin.pending]: (state) => {
      state.status = "loading";
    },
    [staffLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.staffDetail = action.payload;
      localStorage.setItem("staffDetail", JSON.stringify(action.payload));
      toast.success("Welcome To staff Portal");
    },
    [staffLogin.rejected]: (state, action) => {
      state.status = "failure";
      state.error = action.error;
      console.log("Enter the correct credentials");
      toast.error("Enter the correct credentials");
    },
  },
});

export const staffAuthReducer = staffAuthSlice.reducer;
export const { staffLogout } = staffAuthSlice.actions;

export { staffLogin, staffSignup };