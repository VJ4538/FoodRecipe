import React from "react";
import { Box, Tabs, Tab, Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  tabMenu: {
    fontFamily: "Zen Dots",
    fontSize: "13px",
  },
});

export default function Header({ currentTab, handleTabsChange }) {
  const classes = useStyles();
  const tabs = [
    {
      label: "BMI Calculator",
      value: "BMI",
    },
    {
      label: "Calorie Calculator",
      value: "Calorie",
    },
  ];
  return (
    <React.Fragment>
      <Box m={1}>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons='auto'
          value={currentTab}
          variant='scrollable'
          textColor='primary'>
          {tabs.map((tab) => (
            <Tab
              className={classes.tabMenu}
              key={tab.value}
              label={tab.label}
              value={tab.value}
              textColor='primary'
            />
          ))}
        </Tabs>
        <Divider />
      </Box>
    </React.Fragment>
  );
}
