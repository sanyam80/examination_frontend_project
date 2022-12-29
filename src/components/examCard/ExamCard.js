import style from "./ExamCard.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "reactstrap";

export const ExamCard = ({ examId, examName, examScore }) => {
  console.log(examScore);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div>
      <p className={style.exam_card}>{examName}</p>
      {examScore || examScore === 0 ? (
        <p>Marks Scored: {examScore}</p>
      ) : (
        localStorage.getItem("studentDetail") && (
          <Button className = {style.exam_name} onClick={() => navigate(`/examPaper/${examId}`)}>Start Exam</Button>
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
