import React from "react";
import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Paper,
} from "@material-ui/core";
import { reduxDispatch, reduxSelector } from "../../store/index";
import { fetchRandomRecipe } from "../../slices/recipes";
import FoodGallery from "../../components/RecipeDisplay/FoodGallery";
import SlideShow from "../../components/slideshow/SlideShow";
import ErrorBar from "../errors/ErrorBar";
import Title from "../../components/Title";
import useErrorHook from "../../hooks/useErrorHook";

export default function Result() {
  const dispatch = reduxDispatch();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("xs"));
  const isLoading = reduxSelector((store) => store.recipes.loading);
  const recipeData = reduxSelector((store) => store.recipes.recipeData);

  const { errorState, handleClose, handleErrorMsg } = useErrorHook();

  const fetchRandomRecipes = async () => {
    try {
      const result = await dispatch(fetchRandomRecipe(4));
      if (result.error) {
        handleErrorMsg(result.error.message);
      }
    } catch (e) {
      // console.log(e)
    }
  };

  return (
    <React.Fragment>
      {errorState.open && (
        <ErrorBar errorState={errorState} handleClose={handleClose} />
      )}

      <Box m={mobileDevice ? 1 : 3} component={Paper}>
        <Title title='Featured Articles' />
        <SlideShow />
      </Box>

      <Box m={mobileDevice ? 1 : 3} component={Paper}>
        <Title title='Random Recipes:' />
        <Box m={2} pb={3} align='center'>
          <Button
            onClick={fetchRandomRecipes}
            color='secondary'
            variant='outlined'
            size={mobileDevice ? "small" : "medium"}>
            Generate Random Recipes
          </Button>
        </Box>

        {isLoading ? (
          <Box m={2} pb={2}>
            <LinearProgress color='secondary' />
          </Box>
        ) : (
          <FoodGallery data={recipeData} lg={6} md={6} sm={12} />
        )}
      </Box>
    </React.Fragment>
  );
}
