import style from "./AddTest.module.css";
import { addNewExam } from "../../features/index";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Input,Label } from "reactstrap";

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
        <Label className = "h2 text-black">Enter the test name</Label>
        <Input
          
          type="text"
          onChange={(e) => setExamName(e.target.value)}
          value={examName}
        />
        <Button  onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  );
};