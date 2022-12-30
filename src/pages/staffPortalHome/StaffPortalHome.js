

import { Navbar, ExamCard, AddTestModal } from "../../components/index";
import { useEffect, useState } from "react";
import { getAllExamsWithScores } from "../../features/index";
import { AddQuestion } from "../addQuestion/AddQuestion";
import { useDispatch, useSelector } from "react-redux";
import style from "./StaffPortalHome.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export const StaffPortalHome = () => {
  const dispatch = useDispatch();
  const { allExamsWithScores } = useSelector((store) => store?.exam);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    dispatch(getAllExamsWithScores());
  }, [modal]);

  // const addQuestions = () =>{
  //   return <AddQuestion />
  // }
  return (
    <div class = "bg-#f1f5f9">
      <Navbar />
      <div class = "h2 p-3">Details About Tests</div>
      <br />
      <div className={style.allExamCards}>
        {allExamsWithScores.map((exam) => (
          <ExamCard
            examName={exam?.examName}
            examId={exam?.examId}
            key={exam?.examName}
          />
          
        ))}
        <div  onClick={() => setModal(true)}>
          <button className = {style.button_name}>Add Test</button>
        </div>
      </div>
      {modal && <AddTestModal setModal={setModal} />}
    </div>
  );
};