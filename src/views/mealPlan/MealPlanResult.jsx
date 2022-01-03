import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@material-ui/core";
import FoodGallery from "../../components/RecipeDisplay/FoodGallery";
import Title from "../../components/Title";
import { reduxSelector } from "../../store";

const MealPlanResult = ({ isLoading }) => {
  const { mealPlan } = reduxSelector((store) => store.mealPlan);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box mt={5} m={3} component={Paper}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        mealPlan && (
          <>
            <Box m={2}>
              <Title
                title='Nutrition facts of the meal'
              />
            </Box>

            <Grid container direction='row' justifyContent='space-evenly'>
              {Object.entries(mealPlan.nutrients).map(([name, amount]) => {
                const capName = name[0].toUpperCase() + name.substring(1);
                return (
                  <Grid
                    key={`nutrient-${name}`}
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}>
                    <Box m={2}>
                      <Typography
                        color='textSecondary'
                        variant={mobileDevice ? "h6" : "h5"}
                        align='center'
                        gutterBottom>
                        {`${capName}: ${amount} `}
                        {name === "calories" ? "cal" : "g"}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>

            <Box pb={2}>
              <Title title='Meal:' />
            </Box>
            <FoodGallery data={mealPlan.meals} lg={4} md={4} sm={12} xs={12} />
          </>
        )
      )}
    </Box>
  );
};

export default MealPlanResult;
