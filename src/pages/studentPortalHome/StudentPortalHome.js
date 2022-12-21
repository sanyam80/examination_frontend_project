import { Navbar, ExamCard } from "../../components/index";
import { useEffect } from "react";
import { getAllExamsWithScores } from "../../features/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./StudentPortalHome.module.css";

export const StudentPortal = () => {
  const dispatch = useDispatch();
  const { allExamsWithScores } = useSelector((store) => store?.exam);
  useEffect(() => {
    dispatch(getAllExamsWithScores());
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style.allExamCards}>
        {allExamsWithScores.map((exam) => (
          <ExamCard
            examName={exam?.examName}
            examScore={exam?.score}
            examId={exam?.examId}
            key={exam?.examName}
          />
        ))}
      </div>
    </div>
  );
};