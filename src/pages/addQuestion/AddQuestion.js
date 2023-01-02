import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postQuestion } from "../../features/index";
import style from "./AddQuestion.css";
import { Navbar } from "../../components/index";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Input,Label } from "reactstrap";

export const AddQuestion = () => {
  const { examId } = useParams();
  const dispatch = useDispatch();
  const { allExamsWithScores } = useSelector((store) => store.exam);
  const [completeQuestion, setCompleteQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_ans: "",
    exam: examId,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(completeQuestion);
    dispatch(postQuestion(completeQuestion));
    setCompleteQuestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct_ans: "",
      exam: examId,
    });
  };
  const addQuestion = ()=>{
    alert("Question is been added to the test")
  }

  return (
    <div>
      <Navbar />

      <form onSubmit={submitHandler}>
        {allExamsWithScores.find((exam) => exam.examId === examId)?.examName}
        <Input
          type="text"
          className = "text-center w-50 m-auto"
          placeholder="Enter Question"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              question: e.target.value,
            })
          }
          value={completeQuestion.question}
        />

        <Input
          type="text"
          className = "text-center w-50 m-auto"
          placeholder="Option 1"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option1: e.target.value,
            })
          }
          value={completeQuestion.option1}
        />
        <Input
          type="text"
          className = "text-center w-50 m-auto"
          placeholder="option 2"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option2: e.target.value,
            })
          }
          value={completeQuestion.option2}
        />
        <Input
          type="text"
          className = "text-center w-50 m-auto"
          placeholder="Option 3"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option3: e.target.value,
            })
          }
          value={completeQuestion.option3}
        />
        <Input
          type="text"
          className = "text-center w-50 m-auto"
          placeholder="Option 4"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option4: e.target.value,
            })
          }
          value={completeQuestion.option4}
        />
        <Input
          type="text"
          className = "text-center w-50 m-auto"
          placeholder="Enter Correct Answer"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              correct_ans: e.target.value,
            })
          }
          value={completeQuestion.correct_ans}
        />
        <div className={style.addquestion_btn}>
         <Button onClick = {()=>addQuestion}>Add Question</Button>
        </div>
      </form>
    </div>
  );
};