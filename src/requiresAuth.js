import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function StudentRequiresAuth({ children }) {
  const location = useLocation();
  const { studentDetail } = useSelector((store) => store.studentAuth);

  return studentDetail ? (
    children
  ) : (
    <Navigate to="/studentLogin" state={{ from: location }} replace />
  );
}

export function StaffRequiresAuth({ children }) {
  const location = useLocation();
  const { staffDetail } = useSelector((store) => store.staffAuth);

  return staffDetail ? (
    children
  ) : (
    <Navigate to="/staffLogin" state={{ from: location }} replace />
  );
}