import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  status: "idle",
  allExamsWithScores: [],
  examPaper: [],
  error: null,
};

const getAllExamsWithScores = createAsyncThunk(
  "exam/getAllExamsWithScores",
  async () => {
    try {
      const examResponse = await axios.get("exam/");
      const allExams = examResponse.data;
      const scoreResponse = await axios.get("score/");
      const allScores = scoreResponse.data;
      const studentId = JSON.parse(
        localStorage.getItem("studentDetail")
      )?.student_id;
      const scoreOfStudent = allScores.filter(
        (score) => score.student === studentId
      );
      const result = [];
      for (let exam of allExams) {
        const scoreInAParticularExam = scoreOfStudent.find(
          (score) => score.exam === exam.exam_id
        );
        if (scoreInAParticularExam) {
          result.push({
            examId: exam.exam_id,
            examName: exam.name,
            score: scoreInAParticularExam.score,
          });
        } else {
          result.push({
            examId: exam.exam_id,
            examName: exam.name,
            score: null,
          });
        }
      }
      return result;
    } catch (err) {
      return err;
    }
  }
);

const getQuestions = createAsyncThunk(
  "exam/getQuestions",
  async ({ examId }) => {
    try {
      const response = await axios.get("question/");
      return response.data.filter((question) => question.exam == examId);
    } catch (err) {
      return err;
    }
  }
);

const postQuestion = createAsyncThunk(
  "exam/postQuestion",
  async (questionDetail) => {
    console.log(questionDetail);
    try {
      await axios.post("question/", questionDetail);
    } catch (err) {
      console.loga(err);
    }
  }
);

const deleteQuestion = createAsyncThunk(
  "exam/deleteQuestion",
  async ({ questionId }) => {
    try {
      await axios.delete(`question/${questionId}/`);
    } catch (err) {
      console.log(err);
    }
  }
);

const postScore = createAsyncThunk("exam/postScore", async (scoreDetail) => {
  try {
    console.log(scoreDetail);
    const response = await axios.post("score/", scoreDetail);
  } catch (err) {
    console.log(scoreDetail);
  }
});

const addNewExam = createAsyncThunk("exam/addNewExam", async (examName) => {
  try {
    const response = await axios.post("exam/", examName);
    // return response.data;
  } catch (err) {
    console.log(err);
    // return err;
  }
});

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    staffLogout: (state) => {
      state.status = "idle";
      state.staffDetail = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getAllExamsWithScores.pending]: (state) => {
      state.status = "loading";
    },
    [getAllExamsWithScores.fulfilled]: (state, action) => {
      state.status = "success";
      state.allExamsWithScores = action.payload;
      // toast.success("");
    },
    [getAllExamsWithScores.rejected]: (state, action) => {
      console.log("rejected");
      // state.status = "failure";
      // state.error = action.payload.error;
      // toast.error(`${state.error.message}. Please try again later.`);
    },
    [getQuestions.pending]: (state) => {
      state.status = "loading";
    },
    [getQuestions.fulfilled]: (state, action) => {
      state.status = "success";
      state.examPaper = action.payload;
      // state. = action.payload;
      // console.log(action.payload);
      // toast.success("Welcome To staff Portal");
    },
    [getQuestions.rejected]: (state, action) => {
      state.status = "failure";
      // state.error = action.error;
      // console.log("Enter the correct credentials");
      // toast.error("Enter the correct credentials");
    },
  },
});

export const examReducer = examSlice.reducer;
// export const { staffLogout } = staffAuthSlice.actions;

export {
  getAllExamsWithScores,
  getQuestions,
  postScore,
  addNewExam,
  deleteQuestion,
  postQuestion,
};