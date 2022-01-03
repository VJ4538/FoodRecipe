import React, { memo } from "react";
import {
  Typography,
  Box,
  Grid,
  makeStyles,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import CalorieBreakdown from "./CalorieBreakdown";
import Title from "../../components/Title";
import tableStyle from "../../theme/tableStyle";

const useStyles = makeStyles((theme) => ({
  root: {},
  ...tableStyle(theme),
  calorieBreakdown: {
    marginTop: theme.spacing(2),
    maxWidth: "200px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "150px",
      minWidth: "150px",
    },
  },
}));

const NutritionDetail = ({ recipe }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));
  const { nutrition } = recipe;
  const { caloricBreakdown } = nutrition;

  return (
    <Box>
      <Box mt={2}>
        <Title title='Calorie Breakdown:' includeDivider={true} />
      </Box>
      <Grid container direction='row' justifyContent='space-evenly'>
        {Object.entries(caloricBreakdown).map((each) => {
          const [name, amount] = each;
          return (
            <Grid
              lg={4}
              md={6}
              sm={6}
              item
              className={classes.calorieBreakdown}>
              <Typography
                color='textSecondary'
                variant={mobileDevice ? "h6" : "h5"}
                align='center'
                gutterBottom>
                {name.substring(7)}
              </Typography>
              <CalorieBreakdown amount={amount} />
            </Grid>
          );
        })}
      </Grid>

      <Box mt={2} mb={2}>
        <Title title='Nutrients:' includeDivider={true} />
      </Box>

      <Grid container direction='row' justifyContent='space-evenly'>
        <Grid lg={12} md={12} sm={12} item>
          {recipe && (
            <Paper className={classes.tableContainer}>
              <TableContainer className={classes.table}>
                <Table size='small' stickyHeader>
                  <TableHead>
                    {["Nutritions", "Amount"].map((each) => {
                      return (
                        <TableCell
                          key={each}
                          width='50%'
                          className={classes.THeader}>
                          {each}
                        </TableCell>
                      );
                    })}
                  </TableHead>
                  <TableBody>
                    {recipe.nutrition.nutrients.map((each, idx) => {
                      return (
                        <TableRow key={`nutrition-${idx}`} hover={true}>
                          <TableCell>{each.title && each.title}</TableCell>
                          <TableCell>
                            {each.amount && each.amount}{" "}
                            {each.unit && each.unit}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(NutritionDetail);
