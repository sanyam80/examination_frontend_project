import { Navbar, ExamCard } from "../../components/index";
import { useEffect } from "react";
import { getAllExamsWithScores } from "../../features/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import style from "./StudentPortalHome.module.css";

export const StudentPortal = () => {
  const dispatch = useDispatch();
  const { allExamsWithScores } = useSelector((store) => store?.exam);
  useEffect(() => {
    dispatch(getAllExamsWithScores());
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {allExamsWithScores.map((exam) => (
          <div className = "shadow-lg p-3  m-5 bg-body rounded">
            
          <ExamCard examName={exam?.examName} examScore={exam?.score}
            examId={exam?.examId}
            key={exam?.examName}
            
          />
          </div>
        ))}
      </div>
    </div>
  );
};