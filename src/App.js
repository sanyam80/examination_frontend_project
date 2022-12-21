import { Route, Routes } from "react-router-dom";
import {
  Home,
  StudentLogin,
  StaffLogin,
  StudentSignup,
  StaffSignup,
  StudentPortal,
  StaffPortalHome,
  ExamPaper,
  AddQuestion,
} from "./pages/index";
import { StudentRequiresAuth, StaffRequiresAuth } from "./requiresAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const App = () => {
  return (
    <main className="App">
      <ToastContainer autoClose={1250} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route path="/studentSignup" element={<StudentSignup />} />
        <Route path="/staffSignup" element={<StaffSignup />} />

        <Route
          path="/studentPortalHome"
          element={
            <StudentRequiresAuth>
              <StudentPortal />
            </StudentRequiresAuth>
          }
        />
        <Route
          path="/staffPortalHome"
          element={
            <StaffRequiresAuth>
              <StaffPortalHome />
            </StaffRequiresAuth>
          }
        />
        <Route
          path="/examPaper/:examId"
          element={
            <StudentRequiresAuth>
              <ExamPaper />
            </StudentRequiresAuth>
          }
        />
        <Route
          path="/viewPaper/:examId"
          element={
            <StaffRequiresAuth>
              <ExamPaper />
            </StaffRequiresAuth>
          }
        />
        <Route
          path="/deleteQuestions/:examId"
          element={
            <StaffRequiresAuth>
              <ExamPaper />
            </StaffRequiresAuth>
          }
        />
        <Route
          path="/addQuestion/:examId"
          element={
            <StaffRequiresAuth>
              <AddQuestion />
            </StaffRequiresAuth>
          }
        />
      </Routes>
    </main>
  );
};
