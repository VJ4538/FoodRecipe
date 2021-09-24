import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"

import { useDispatch, useSelector} from "react-redux";

const store =configureStore({
    reducer:rootReducer,
})
   
export const reduxDispatch =useDispatch

export const reduxSelector =useSelector

export default store