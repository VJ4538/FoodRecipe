import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeApi from "../api/recipeApi";

const initialState = {
  searchResult: [],
};
export const searchRecipe = createAsyncThunk(
  "recipes/searchRecipe",
  async (query) => {
    const response = await recipeApi.recipeComplexSearch(query);
    // console.log('Search Recipe Response', response)
    return response;
  },
);

const slice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {},
  extraReducers: {
    [searchRecipe.pending]: (state, action) => {
      state.status = "loading";
      state.loading = true;
    },
    [searchRecipe.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.searchResult = action.payload;
      state.loading = false;
    },
    [searchRecipe.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const reducer = slice.reducer;

// export const searchRecipe = (query) => async (dispatch) => {
//     const result = await recipeApi.recipeComplexSearch(query)
//     dispatch(slice.actions.setSearchResult(result))
//     console.log(result)
//     return result
// }

export default slice;
