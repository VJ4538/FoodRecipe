import React from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  CardContent,
  DialogActions,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import data from "../../../data/ActivityData";
import { reduxDispatch, reduxSelector } from "../../../store/index";
import {
  calculateCalorieResult,
  resetResults,
} from "../../../slices/calculator";
import Title from "../../../components/Title";

const useStyles = makeStyles((theme) => ({
  root: {},
  result: {
    paddingTop: "0px !important",
    margin: `auto ${theme.spacing(0.5)}px`,
  },
}));

const CalorieCalculator = () => {
  const classes = useStyles();
  const dispatch = reduxDispatch();
  const { ActivityList } = data;

  const calorieResult = reduxSelector(
    (store) => store.calculator.CalorieResult,
  );

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        age: "",
        gender: "male",
        weight: "",
        heightInch: "",
        heightFeet: "",
        activity: "-1",
        goal: "lose",
        goalAmount: 2,
        duration: 7,
        durationTime: 1,
      }}
      validationSchema={Yup.object().shape({
        weight: Yup.number()
          .min(1, "Please enter a valid weight")
          .required("Please enter a valid weight"),
        activity: Yup.number()
          .min(1, "Please select one")
          .required("Please select one"),
        age: Yup.number()
          .min(1, "Please enter a valid age")
          .required("Please enter a valid age"),
        gender: Yup.string().required("Please select a gender"),
        heightInch: Yup.number()
          .min(0, "Please enter a valid height")
          .required("Please enter a valid height"),
        heightFeet: Yup.number()
          .min(0, "Please enter a valid height")
          .required("Please enter a valid height"),
        goalAmount: Yup.number()
          .min(1, "Please enter a valid goal amount")
          .required("Please enter a valid goal amount"),
        durationTime: Yup.number()
          .min(1, "Please enter a valid time")
          .required("Please enter a valid time"),
      })}
      onSubmit={async (values) => {
        try {
          dispatch(calculateCalorieResult(values));
        } catch (e) {
          console.log(e);
        }
      }}>
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        resetForm,
        touched,
        values,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box p={2}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Title title='Why ?' />

                    <Typography
                      align='left'
                      color='textSecondary'
                      variant='body2'>
                      Estimate the number of calories a person needs to consume
                      each day can provide some simple guidelines for gaining or
                      losing weight.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <CardContent>
                <Box p={2}>
                  <Title title='Calculate calories:' />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                      select
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true }}
                      label='Gender'
                      name='gender'
                      value={values.gender}
                      onChange={handleChange}
                      variant='outlined'>
                      <option key={"male"} value={"male"}>
                        Male
                      </option>

                      <option key={"female"} value={"female"}>
                        Female
                      </option>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.age && errors.age)}
                      helperText={touched.age && errors.age}
                      type='number'
                      label='Age'
                      name='age'
                      value={values.age}
                      onChange={handleChange}
                      variant='outlined'></TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <TextField
                      error={Boolean(touched.heightFeet && errors.heightFeet)}
                      helperText={touched.heightFeet && errors.heightFeet}
                      type='number'
                      label='Height / Feet'
                      name='heightFeet'
                      value={values.heightFeet}
                      onChange={handleChange}
                      variant='outlined'></TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3}>
                    <TextField
                      error={Boolean(touched.heightInch && errors.heightInch)}
                      helperText={touched.heightInch && errors.heightInch}
                      type='number'
                      label='Height / Inch'
                      name='heightInch'
                      value={values.heightInch}
                      onChange={handleChange}
                      variant='outlined'></TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.weight && errors.weight)}
                      helperText={touched.weight && errors.weight}
                      type='number'
                      label='Weight / Pounds'
                      name='weight'
                      value={values.weight}
                      onChange={handleChange}
                      variant='outlined'></TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      error={Boolean(touched.activity && errors.activity)}
                      helperText={touched.activity && errors.activity}
                      select
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true }}
                      label='Activity'
                      name='activity'
                      value={values.activity}
                      onChange={handleChange}
                      variant='outlined'>
                      <option key={"none"} value={-1} disabled>
                        Please Select One
                      </option>

                      {ActivityList.map((each) => (
                        <option key={each.id} value={each.value}>
                          {each.context}
                        </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.goal && errors.goal)}
                      helperText={touched.goal && errors.goal}
                      select
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true }}
                      label='Goal'
                      name='goal'
                      value={values.goal}
                      onChange={handleChange}
                      variant='outlined'>
                      <option key={"lose"} value={"lose"}>
                        Lose Weight
                      </option>

                      <option key={"gain"} value={"gain"}>
                        Gain Weight
                      </option>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.goalAmount && errors.goalAmount)}
                      helperText={touched.goalAmount && errors.goalAmount}
                      type='number'
                      label='Goal Amount / Pounds'
                      name='goalAmount'
                      value={values.goalAmount}
                      onChange={handleChange}
                      variant='outlined'></TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(
                        touched.durationTime && errors.durationTime,
                      )}
                      helperText={touched.durationTime && errors.durationTime}
                      type='number'
                      label='Duration Time'
                      name='durationTime'
                      value={values.durationTime}
                      onChange={handleChange}
                      variant='outlined'></TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      error={Boolean(touched.duration && errors.duration)}
                      helperText={touched.duration && errors.duration}
                      select
                      SelectProps={{ native: true }}
                      InputLabelProps={{ shrink: true }}
                      label='Duration'
                      name='duration'
                      value={values.duration}
                      onChange={handleChange}
                      variant='outlined'>
                      <option key={"Day"} value={1}>
                        Day
                      </option>

                      <option key={"Week"} value={7}>
                        Week
                      </option>

                      <option key={"Month"} value={30}>
                        Month
                      </option>
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>

              <DialogActions>
                <Button
                  color='secondary'
                  variant='outlined'
                  onClick={() => {
                    resetForm();
                    dispatch(resetResults());
                  }}>
                  {"Reset Form"}
                </Button>

                <Button
                  color='secondary'
                  variant='outlined'
                  type='submit'
                  disabled={isSubmitting}>
                  {"Calculate"}
                </Button>
              </DialogActions>

              {/* <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre> */}

              {calorieResult.maintain && (
                <Grid item xs={12} md={12}>
                  <Title title='Result:' />

                  <Box display='flex' justifyContent='left'>
                    <Typography color='textSecondary' variant='body2'>
                      {`The amount of caloires you need daily to maintain your current weight is`}
                    </Typography>
                    <Title
                      className={classes.result}
                      title={calorieResult.maintain}
                      includeDivider={false}
                    />
                  </Box>
                </Grid>
              )}

              {calorieResult.goal && (
                <Grid item xs={12} md={12}>
                  <Box display='flex' justifyContent='left'>
                    <Typography color='textSecondary' variant='body2'>
                      {`The amount of caloires you need daily to reach your goal is `}
                    </Typography>
                    <Title
                      className={classes.result}
                      title={calorieResult.goal}
                      includeDivider={false}
                    />
                  </Box>
                </Grid>
              )}
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default CalorieCalculator;
