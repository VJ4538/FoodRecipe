import React, { useEffect, useCallback } from "react";
import { reduxDispatch } from "../../store/index";
import { useHistory } from "react-router-dom";
import { setNavPosition } from "../../slices/navbar";
import { fetchRandomRecipe } from "../../slices/recipes";
import ErrorBar from "../errors/ErrorBar";
import Page from "../../components/Page";
import Result from "./Result";
import useErrorHook from "../../hooks/useErrorHook";

let init = false;

export default function Index() {
  const dispatch = reduxDispatch();
  const history = useHistory();
  const { errorState, handleClose, handleErrorMsg } = useErrorHook();
  const fetchingRandomRecipes = useCallback(
    async (number) => {
      if (!init) {
        try {
          init = true;
          const result = await dispatch(fetchRandomRecipe(number));
          if (result.error) {
            // console.log(result.error)
            handleErrorMsg(result.error.message);
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
    [dispatch, handleErrorMsg],
  );

  useEffect(() => {
    fetchingRandomRecipes(4);
  }, [dispatch, fetchingRandomRecipes]);

  useEffect(() => {
    if (history.location.pathname === "/") {
      dispatch(setNavPosition(0));
    }
  }, [dispatch, history]);

  return (
    <Page title='Home'>
      {errorState.open && (
        <ErrorBar errorState={errorState} handleClose={handleClose} />
      )}
      <Result />
    </Page>
  );
}
