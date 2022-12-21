import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postQuestion } from "../../features/index";
import style from "./AddQuestion.css";
import { Navbar } from "../../components/index";
import { useState } from "react";

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

  return (
    <div className={style.addQuestionPage}>
      <Navbar />

      <form onSubmit={submitHandler} className={style.questionForm}>
        {allExamsWithScores.find((exam) => exam.examId === examId)?.examName}
        <input
          type="text"
          placeholder="Enter Question"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              question: e.target.value,
            })
          }
          value={completeQuestion.question}
        />

        <input
          type="text"
          placeholder="Option 1"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option1: e.target.value,
            })
          }
          value={completeQuestion.option1}
        />
        <input
          type="text"
          placeholder="option 2"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option2: e.target.value,
            })
          }
          value={completeQuestion.option2}
        />
        <input
          type="text"
          placeholder="Option 3"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option3: e.target.value,
            })
          }
          value={completeQuestion.option3}
        />
        <input
          type="text"
          placeholder="Option 4"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              option4: e.target.value,
            })
          }
          value={completeQuestion.option4}
        />
        <input
          type="text"
          placeholder="Enter Correct Answer"
          onChange={(e) =>
            setCompleteQuestion({
              ...completeQuestion,
              correct_ans: e.target.value,
            })
          }
          value={completeQuestion.correct_ans}
        />
        <button>Add Question</button>
      </form>
    </div>
  );
};