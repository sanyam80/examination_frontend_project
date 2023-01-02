import style from "./ExamCard.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "reactstrap";

export const ExamCard = ({ examId, examName, examScore }) => {
  console.log(examScore);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className={style.card}>
      <p className={style.exam_card}>{examName}</p>
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
          <Button onClick={() => navigate(`/viewPaper/${examId}`)}>
            See All Questions
          </Button>
          <Button onClick={() => navigate(`/addQuestion/${examId}`)}>
            Add New Questions
          </Button>
          <Button onClick={() => navigate(`/deleteQuestions/${examId}`)}>
            Delete Questions
          </Button>
        </div>
      )}
    </div>
  );
};
