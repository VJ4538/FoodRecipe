import React, { useEffect, useCallback } from "react";
import Page from "../../components/Page";
import RecipeDetail from "./RecipeDetail";

import { LinearProgress } from "@material-ui/core";

import { reduxDispatch, reduxSelector } from "../../store/index";

import { fetchRecipeDetail } from "../../slices/recipeDetail";
import ErrorBar from "../errors/ErrorBar";

import { setNavPosition } from "../../slices/navbar";
import useErrorHook from "../../hooks/useErrorHook";

const Index = (props) => {
  const dispatch = reduxDispatch();
  const recipe = reduxSelector((store) => store.recipeDetail);
  const isLoading = reduxSelector((store) => store.loading);
  const recipeId = props.match.params.recipeId;
  const isSearch = props.match.params.search;
  const { errorState, handleClose, handleErrorMsg } = useErrorHook();

  const fetchDetailRecipeData = useCallback(
    async (recipeId) => {
      try {
        const result = await dispatch(fetchRecipeDetail(recipeId));
        if (result.error) {
          handleErrorMsg(result.error.message);
        }
      } catch (e) {
        // console.error(e)
      }
    },
    [dispatch, handleErrorMsg],
  );

  useEffect(() => {
    fetchDetailRecipeData(recipeId);
  }, [recipeId, fetchDetailRecipeData]);

  useEffect(() => {
    dispatch(setNavPosition(4));
  }, [dispatch]);

  return (
    <Page title='Recipe Detail'>
      {errorState.open && (
        <ErrorBar errorState={errorState} handleClose={handleClose} />
      )}
      {isLoading ? (
        <LinearProgress />
      ) : (
        recipe.recipeDetail && (
          <RecipeDetail recipe={recipe.recipeDetail} isSearch={isSearch} />
        )
      )}
    </Page>
  );
};

export default Index;
