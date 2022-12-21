

import { configureStore } from "@reduxjs/toolkit";
import {
  studentAuthReducer,
  staffAuthReducer,
  examReducer,
} from "./features/index";

export const store = configureStore({
  reducer: {
    studentAuth: studentAuthReducer,
    staffAuth: staffAuthReducer,
    exam: examReducer,
  },
});