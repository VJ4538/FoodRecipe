import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import recipeApi from "../api/recipeApi";

import {data} from '../data/TestingDummyData'

export const fetchRandomRecipe = createAsyncThunk(
    'recipes/fetchRandomRecipe',
    async (number) => {
      const response = await recipeApi.generateRandomRecipe(number)
      // console.log('Recipe Response', response)
      return response
    }
  )

const initialState={
    recipeData:null,
    loading:false,
    status:null,
    error:null,
}

const slice =createSlice({
    name:'recipes',
    initialState,
    reducers:{

    },
    extraReducers: {
        [fetchRandomRecipe.pending]: (state, action) => {
          state.status = 'loading'
          state.loading = true
        },
        [fetchRandomRecipe.fulfilled]: (state, action) => {
          state.status = 'succeeded'
          state.recipeData = action.payload
          state.loading = false
        },
        [fetchRandomRecipe.rejected]: (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        },
      },
})


export const reducer =slice.reducer


export default slice