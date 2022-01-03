import { useState, useCallback } from "react";

export default function useErrorHook() {
  const [errorState, setErrorState] = useState({
    open: false,
    msg: "Something went Wrong!",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorState((prev) => {
      return {
        ...prev,
        open: false,
      };
    });
  };

  const handleErrorMsg = useCallback((error) => {
    const errorType = error.split("");
    const msg =
      errorType[errorType.length - 1] === "404"
        ? "Error Code 404 bad request"
        : "Reached max amount of request for current Spoonacular API Plan";

    setErrorState({
      msg: msg,
      open: true,
    });
  }, []);

  return {
    errorState,
    handleClose,
    handleErrorMsg,
  };
}
