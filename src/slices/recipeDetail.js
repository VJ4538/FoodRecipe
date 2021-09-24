import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import recipeApi from "../api/recipeApi";

export const fetchRecipeDetail = createAsyncThunk(
    'recipes/fetchRecipeNutrition',
    async (recipeId) => {
      const response = await recipeApi.getRecipeInformation(recipeId)
      // console.log('Recipe Response', response)
      return response
    }
  )

const initialState={
    recipeDetail:null,
    loading:false,
    status:null,
    error:null,
}

const slice =createSlice({
    name:'recipeDetail',
    initialState,
    reducers:{
    },
    extraReducers: {
        [fetchRecipeDetail.pending]: (state, action) => {
          state.status = 'loading'
          state.loading = true
        },
        [fetchRecipeDetail.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          state.recipeDetail = action.payload
          state.loading = false
        },
        [fetchRecipeDetail.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        },
      },
})


export const reducer =slice.reducer


export default slice