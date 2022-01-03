import React from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";

import mealPlanInstructions from "../../data/mealPlanInstructions";
import Title from "../../components/Title";

const MealPlanInstructions = () => {
  return (
    <>
      <Title title='Instructions:' />
      <Box p={1}>
        <List>
          {mealPlanInstructions.mealPlanInstructions &&
            mealPlanInstructions.mealPlanInstructions.map((each, idx) => {
              return (
                <ListItem key={`instruction-${idx}`} disablePadding>
                  <ListItemText
                    secondary={`${idx + 1}:  ${each.step ? each.step : "N/A"}`}
                  />
                </ListItem>
              );
            })}
        </List>
      </Box>
    </>
  );
};

export default React.memo(MealPlanInstructions);
