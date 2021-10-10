import { combineReducers } from "redux";
import { reducer as recipesReducer} from '../slices/recipes'
import { reducer as calculatorReducer} from '../slices/calculator'
import { reducer as recipeDetailReducer } from '../slices/recipeDetail'
import { reducer as searchResultReducer } from '../slices/searchResult'
import { reducer as navBarReducer } from '../slices/navbar'
import { reducer as mealPlanReducer } from '../slices/mealPlan'


const rootReducer= combineReducers({
    recipes:recipesReducer,
    calculator:calculatorReducer,
    recipeDetail:recipeDetailReducer,
    searchResult:searchResultReducer,
    navbar:navBarReducer,
    mealPlan:mealPlanReducer,
})

export default rootReducer