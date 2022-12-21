import style from "./AddTest.css";
import { addNewExam } from "../../features/index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddTestModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const [examName, setExamName] = useState("");

  const submitHandler = () => {
    dispatch(addNewExam({ name: examName }));
    setModal(false);
  };

  return (
    <div className={style.main} onClick={() => setModal(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <label>Enter the test name</label>
        <input
          className={style.input}
          type="text"
          onChange={(e) => setExamName(e.target.value)}
          value={examName}
        />
        <button className={style.submitBtn} onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};