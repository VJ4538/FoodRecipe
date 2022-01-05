import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  CardContent,
  Button,
  DialogActions,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@material-ui/core";
import data from "../../../data/BMIdata";
import { reduxDispatch, reduxSelector } from "../../../store/index";
import { calculateBMIResult } from "../../../slices/calculator";
import Title from "../../../components/Title";
import tableStyle from "../../../theme/tableStyle";

const useStyles = makeStyles((theme) => ({
  root: {},
  ...tableStyle(theme),
  result: {
    paddingTop: "0px !important",
    margin: `auto ${theme.spacing(0.5)}px`,
  },
}));

const BMICalculator = () => {
  const classes = useStyles();
  const dispatch = reduxDispatch();
  const { bmiChart } = data;

  const BMIResult = reduxSelector((store) => store.calculator.BmiResult);
  return (
    <Formik
      data-testid='BMIcalculator'
      validateOnChange={true}
      initialValues={{
        weight: "",
        heightInch: "",
        heightFeet: "",
      }}
      validationSchema={Yup.object().shape({
        weight: Yup.number()
          .min(1, "Please enter a valid weight")
          .required("Please enter a valid weight"),
        heightInch: Yup.number()
          .min(0, "Please enter a valid height")
          .required("Please enter a valid height"),
        heightFeet: Yup.number()
          .min(0, "Please enter a valid height")
          .required("Please enter a valid height"),
      })}
      onSubmit={async (values, { resetForm }) => {
        try {
          dispatch(calculateBMIResult(values));
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
        touched,
        values,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Title title='What is BMI :' />

                  <Typography
                    align='left'
                    color='textSecondary'
                    variant='body2'>
                    Body mass index (BMI) is a measure of body fat based on
                    height and weight that applies to adult men and women.
                  </Typography>
                </Grid>

                <Grid item xs={12} md={12}>
                  <Table size='small' className={classes.table}>
                    <TableHead>
                      <TableRow>
                        {["Category", "BMI range"].map((each) => {
                          return (
                            <TableCell
                              key={each}
                              width='50%'
                              className={classes.THeader}>
                              {each}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bmiChart.map((each) => {
                        return (
                          <TableRow key={each.id} hover={true}>
                            <TableCell>{each.title && each.title}</TableCell>
                            <TableCell>{each.value && each.value}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>

              <CardContent>
                <Box pb={2}>
                  <Title title='Calculate your BMI today:' />
                </Box>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                      <TextField
                        error={Boolean(touched.heightFeet && errors.heightFeet)}
                        helperText={touched.heightFeet && errors.heightFeet}
                        type='number'
                        label='Height : feet'
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
                        label='Height : inch'
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
                        label='Weight : pounds'
                        name='weight'
                        value={values.weight}
                        onChange={handleChange}
                        variant='outlined'></TextField>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>

              <DialogActions>
                <Button
                  color='secondary'
                  variant='outlined'
                  type='submit'
                  disabled={isSubmitting}>
                  Calculate
                </Button>
              </DialogActions>

              {/* <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre> */}
              {(BMIResult || BMIResult === 0) && (
                <Grid item xs={12} md={12}>
                  <Title title='Result:' />

                  <Box display='flex' justifyContent='center'>
                    <Typography color='textSecondary' variant='body2'>
                      Your BMI is
                    </Typography>

                    <Title
                      className={classes.result}
                      title={BMIResult}
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

export default BMICalculator;
