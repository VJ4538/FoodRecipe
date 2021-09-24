import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import recipeApi from "../api/recipeApi";



const initialState={
    searchResult:[],
}

const slice =createSlice({
    name:'searchResult',
    initialState,
    reducers:{
        setSearchResult(oldState,action){
            oldState.searchResult = action.payload;
        }
    },

})


export const reducer =slice.reducer

export const searchRecipe = (query) => async (dispatch) => {
    const result = await recipeApi.recipeComplexSearch(query)
    dispatch(slice.actions.setSearchResult(result))
    return result
}

export default slice
