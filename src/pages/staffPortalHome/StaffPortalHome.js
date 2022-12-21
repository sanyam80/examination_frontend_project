

import { Navbar, ExamCard, AddTestModal } from "../../components/index";
import { useEffect, useState } from "react";
import { getAllExamsWithScores } from "../../features/index";
import { useDispatch, useSelector } from "react-redux";
import style from "./StaffPortalHome.module.css";

export const StaffPortalHome = () => {
  const dispatch = useDispatch();
  const { allExamsWithScores } = useSelector((store) => store?.exam);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    dispatch(getAllExamsWithScores());
  }, [modal]);

  return (
    <div>
      <Navbar />
      <div className={style.allExamCards}>
        {allExamsWithScores.map((exam) => (
          <ExamCard
            examName={exam?.examName}
            examId={exam?.examId}
            key={exam?.examName}
          />
        ))}
        <div className={style.addTest} onClick={() => setModal(true)}>
          +
        </div>
      </div>
      {modal && <AddTestModal setModal={setModal} />}
    </div>
  );
};