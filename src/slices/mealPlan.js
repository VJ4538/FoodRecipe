import { createSlice } from "@reduxjs/toolkit";

import recipeApi from "../api/recipeApi";

const initialState = {
  mealPlan: null,
};

const slice = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    setMealPlan(oldState, action) {
      oldState.mealPlan = action.payload;
    },
  },
});

export const reducer = slice.reducer;

export const generateMealPlan = (query) => async (dispatch) => {
  const result = await recipeApi.generateMealPlan(query);
  // console.log('Meal Plan', result)
  dispatch(slice.actions.setMealPlan(result));

  return result;
};

export default slice;
