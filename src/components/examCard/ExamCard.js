import style from "./ExamCard.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const ExamCard = ({ examId, examName, examScore }) => {
  console.log(examScore);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className={style.card}>
      <p>{examName}</p>
      {examScore || examScore === 0 ? (
        <p>Marks Scored: {examScore}</p>
      ) : (
        localStorage.getItem("studentDetail") && (
          <p onClick={() => navigate(`/examPaper/${examId}`)}>Start Exam</p>
        )
      )}
      {(examScore || examScore === 0) && (
        <p className={style.examAlreadyTaken}>Exam Already Taken</p>
      )}
      {pathname === "/staffPortalHome" && (
        <div className={style.actionButtons}>
          <button onClick={() => navigate(`/viewPaper/${examId}`)}>
            See All Questions
          </button>
          <button onClick={() => navigate(`/addQuestion/${examId}`)}>
            Add New Questions
          </button>
          <button onClick={() => navigate(`/deleteQuestions/${examId}`)}>
            Delete Questions
          </button>
        </div>
      )}
    </div>
  );
};
