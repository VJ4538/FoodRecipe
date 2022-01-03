import React, { useState } from "react";
import { Formik } from "formik";
import uniqid from "uniqid";
import {
  Box,
  Button,
  Chip,
  DialogActions,
  Grid,
  TextField,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { XCircle as XCircleIcon } from "react-feather";
import dietData from "../../data/dietType";
import Title from "../../components/Title";
import { reduxDispatch } from "../../store";
import { generateMealPlan } from "../../slices/mealPlan";
import ErrorBar from "../errors/ErrorBar";
import useErrorHook from "../../hooks/useErrorHook";
import chipStyle from "../../theme/chipStyle";
import MealPlanInstructions from "./MealPlanInstructions";
import MealPlanResult from "./MealPlanResult";

const useStyles = makeStyles((theme) => ({
  root: {},
  ...chipStyle(theme),
}));

export default function MealPlanForm() {
  const classes = useStyles();
  const dispatch = reduxDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { errorState, handleClose, handleErrorMsg } = useErrorHook();

  return (
    <React.Fragment>
      {errorState.open && (
        <ErrorBar errorState={errorState} handleClose={handleClose} />
      )}
      <Box m={3} component={Paper}>
        <MealPlanInstructions />

        <Formik
          validateOnChange={true}
          // validateOnBlur={false}
          initialValues={{
            dietType: "none",
            excludeIngredient: "",
            excludeIngredients: [],
          }}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            try {
              let query = "";
              let caloriesQuery = values.targetCalories
                ? `&targetCalories=${values.targetCalories}`
                : "";
              let dietQuery =
                values.dietType === "none" ? "" : `&diet=${values.dietType}`;
              let exclude = "";
              if (values.excludeIngredients.length > 0) {
                let excludeStr = values.excludeIngredients.join(",");
                exclude = `&exclude=${excludeStr}`;
              } else {
                exclude = "";
              }
              query += caloriesQuery + dietQuery + exclude;

              const result = await dispatch(generateMealPlan(query));
              if (result.error) {
                handleErrorMsg(result.error.message);
              }
              setIsLoading(false);
              resetForm();
            } catch (e) {
              console.log(e);
            }
          }}>
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box p={3}>
                  <Box mb={2}>
                    <Title title='Generate your daily meal plan:' />
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item lg={6} xs={12} md={6}>
                      <TextField
                        error={Boolean(
                          touched.targetCalories && errors.targetCalories,
                        )}
                        helperText={
                          touched.targetCalories && errors.targetCalories
                        }
                        type='number'
                        label='Target Calories:'
                        name='targetCalories'
                        value={values.targetCalories}
                        onChange={handleChange}
                        variant='outlined'
                        data-testid='target-Calories'
                        fullWidth></TextField>
                    </Grid>

                    <Grid item lg={6} xs={12} md={6}>
                      <TextField
                        error={Boolean(touched.dietType && errors.dietType)}
                        helperText={touched.dietType && errors.dietType}
                        select
                        SelectProps={{ native: true }}
                        InputLabelProps={{ shrink: true }}
                        label='Diet type'
                        placeholder='Diet type'
                        name='dietType'
                        value={values.dietType}
                        onChange={handleChange}
                        variant='outlined'
                        fullWidth>
                        <option key={"none"} value={"none"}>
                          None
                        </option>

                        {dietData.dietType.map((each) => {
                          return (
                            <option key={each.id} value={each.value}>
                              {each.value}
                            </option>
                          );
                        })}
                      </TextField>
                    </Grid>

                    <Grid item lg={6} xs={12} md={12}>
                      <Box display='flex'>
                        <TextField
                          error={Boolean(
                            touched.excludeIngredient &&
                              errors.includeIngredient,
                          )}
                          helperText={
                            touched.excludeIngredient &&
                            errors.includeIngredient
                          }
                          label='Add exclude Ingredients'
                          placeholder='Add exclude Ingredients'
                          name='excludeIngredient'
                          value={values.excludeIngredient}
                          onChange={handleChange}
                          variant='outlined'
                          fullWidth></TextField>

                        <Button
                          variant='outlined'
                          color='secondary'
                          onClick={() => {
                            if (values.excludeIngredient !== "") {
                              setFieldValue(
                                `excludeIngredients`,
                                [
                                  ...values.excludeIngredients,
                                  {
                                    id: uniqid("chip-"),
                                    value: values.excludeIngredient,
                                  },
                                ],
                                false,
                              );

                              setFieldValue(`excludeIngredient`, "", false);
                            }
                          }}>
                          Add
                        </Button>
                      </Box>
                    </Grid>
                    {values.excludeIngredients.length > 0 && (
                      <Grid item lg={12} xs={12} md={12}>
                        <Title
                          title='Exclude Ingredients:'
                          includeDivider={false}
                        />

                        <Box display='flex'>
                          {values.excludeIngredients.map((each) => {
                            return (
                              <Chip
                                key={each.id}
                                label={each.value}
                                className={classes.Chips}
                                onDelete={() => {
                                  const filteredList =
                                    values.excludeIngredients.filter(
                                      (eachItem) => eachItem.id !== each.id,
                                    );

                                  setFieldValue(
                                    `excludeIngredients`,
                                    filteredList,
                                    false,
                                  );
                                }}
                                deleteIcon={<XCircleIcon />}
                              />
                            );
                          })}
                        </Box>
                      </Grid>
                    )}
                  </Grid>

                  <DialogActions>
                    <Button
                      color='secondary'
                      variant='outlined'
                      type='submit'
                      disabled={isSubmitting}>
                      {"Generate"}
                    </Button>
                  </DialogActions>

                  {/* <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre> */}
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
      <MealPlanResult isLoading={isLoading} />
    </React.Fragment>
  );
}
