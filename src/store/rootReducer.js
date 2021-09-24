import { combineReducers } from "redux";
import { reducer as recipesReducer} from '../slices/recipes'
import { reducer as calculatorReducer} from '../slices/calculator'
import { reducer as recipeDetailReducer } from '../slices/recipeDetail'
import { reducer as searchResultReducer } from '../slices/searchResult'


const rootReducer= combineReducers({
    recipes:recipesReducer,
    calculator:calculatorReducer,
    recipeDetail:recipeDetailReducer,
    searchResult:searchResultReducer,
})

export default rootReducer