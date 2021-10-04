import SpoonacularApi from '../utils/SpoonacularApi'
const apiKey=`apiKey=${process.env.REACT_APP_API_KEY}`
const recipeApi = {
    generateRandomRecipe: async (number) => {
      const result = await SpoonacularApi.get(`/random?${apiKey}&number=${number}`)
      // console.log('result', result.data)
      return result.data.recipes
    },
    getNutritionData: async (recipeId) => {
      const result = await SpoonacularApi.get(`/${recipeId}/nutritionWidget.json?${apiKey}`)
      // console.log('Nutrition result', result.data)
      return result.data
    },
    // getRecipeIngredients: async (recipeId) => {
    //   const result = await SpoonacularApi.get(`/${recipeId}/ingredientWidget.json?${apiKey}`)
    //   // console.log('Ingredients result', result.data)
    //   return result.data
    // },
    // getCookingInstruction: async (recipeId) =>{
    //   const result = await SpoonacularApi.get(`/${recipeId}/analyzedInstructions?${apiKey}`)
    //   // console.log('Instruction result', result.data)
    //   return result.data
    // },
    getRecipeInformation: async (recipeId) =>{
      const result = await SpoonacularApi.get(`/${recipeId}/information?${apiKey}&includeNutrition=true`)
      // console.log('Recipe Information', result.data)
      return result.data
    },
    recipeComplexSearch: async (query) =>{
      const result = await SpoonacularApi.get(`/complexSearch?${apiKey}&addRecipeNutrition=true&${query}`)
      // console.log('Recipe Information', result.data)
      return result.data
    },

  }
  
  export default recipeApi
  