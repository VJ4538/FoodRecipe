import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import BMICalculator from "./CalculatorForm/BMICalculator";
import CalorieCalculator from "./CalculatorForm/CalorieCalculator";
import { Box, Paper, useMediaQuery, useTheme } from "@material-ui/core";
import { resetResults } from "../../slices/calculator";
import { reduxDispatch } from "../../store/index";
import { useHistory } from "react-router-dom";
import { setNavPosition } from "../../slices/navbar";
import Header from "./Header";

export default function Index() {
  const dispatch = reduxDispatch();
  const history = useHistory();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (history.location.pathname === "/calculator") {
      dispatch(setNavPosition(1));
    }
  }, [dispatch, history]);

  const [currentTab, setCurrentTab] = useState("BMI");

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    dispatch(resetResults());
  }, [dispatch, currentTab]);
  return (
    <Page title='Calculator'>
      <Box m={mobileDevice ? 1 : 3} component={Paper}>
        <Header currentTab={currentTab} handleTabsChange={handleTabsChange} />

        {currentTab === "BMI" && <BMICalculator />}
        {currentTab === "Calorie" && <CalorieCalculator />}
      </Box>
    </Page>
  );
}
