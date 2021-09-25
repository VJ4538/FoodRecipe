import React,{useState, useEffect} from 'react'
import clsx from 'clsx'

import * as Yup from 'yup'
import { Formik } from 'formik'

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
} from '@material-ui/core'

import data from '../../../data/BMIdata'

//Slice&7Redux
import {
  reduxDispatch,
  reduxSelector
} from '../../../store/index'

import { calculateBMIResult } from '../../../slices/calculator'
import HeaderDivider from '../../../components/HeaderDivider'



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiDialogActions-root': {
      paddingLeft:'16px',
      paddingRight:'16px'
    },
  },
  table:{
    margin:'1rem 0'
  },
  THeader:{
    fontWeight:'bold',
    FontFace:theme.typography.header.fontFamily
  }
}));

const BMICalculator = ({ className, ...rest }) => {
  const classes = useStyles()
  const dispatch = reduxDispatch()
  const { bmiChart } =data 

  const BMIResult = reduxSelector(store=>store.calculator.BmiResult)

  // console.log('BMIResult', BMIResult)

  return (
    <Formik
      validateOnChange={true}
      // validateOnBlur={false}
      initialValues={{
        weight:'',
        heightInch:'',
        heightFeet:'',
      }}
      
      validationSchema={Yup.object().shape({
        weight: Yup.number()
        .min(1, 'Please enter a valid weight')
        .required('Please enter a valid weight'),
        heightInch: Yup.number()
        .min(1, 'Please enter a valid height')
        .required('Please enter a valid height'),
        heightFeet: Yup.number()
        .min(1, 'Please enter a valid height')
        .required('Please enter a valid height'),
      })}

      onSubmit={async (
        values,
        { resetForm }
      ) => {
        console.log(values)
        try{
          dispatch(calculateBMIResult(values))
          resetForm()
        }catch(e){
          console.log(e)
        }

      }}
    >
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
          <form
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Box p={3}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography align='left' gutterBottom={true} color='textPrimary' variant='h3' component='h3'>
                      {'What is body mass index (BMI) :'}
                    </Typography>
                    <HeaderDivider />
                    
                    <Typography align='left' color='textSecondary' variant='h4' component='h4'>
                      {'Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12} >
                    <Table size="small" className={classes.table}>
                      <TableHead>
                        {['Category', 'BMI range'].map((each)=>{
                          return(
                            <TableCell width='50%' className={classes.THeader}>{each}</TableCell>
                          )
                        })}
                      </TableHead>
                      <TableBody>
                        {bmiChart.map((each)=>{
                          return(
                            <TableRow key={each.id} hover={true}>
                              <TableCell>{each.title&&each.title}</TableCell>
                              <TableCell>{each.value&&each.value}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Box>
                        
            <CardContent>
                <Typography align='center' gutterBottom={true} color='textPrimary' variant='h3' >
                      {'Calculate your BMI today:'}
                </Typography>
                <HeaderDivider />
              <Box>
                <Grid container spacing={2}>

                {/* <Grid item xs={12} sm={12} md={4} > 
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" row name="gender" value={values.gender} onChange={handleChange}>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                    </RadioGroup>
                </Grid>
             */}

                <Grid item xs={12} sm={12} md={3} >
                    <TextField
                        error={Boolean(touched.heightFeet && errors.heightFeet)}
                        helperText={touched.heightFeet && errors.heightFeet}
                        type="number"
                        label="Height : feet"
                        name="heightFeet"
                        value={values.heightFeet}
                        onChange={handleChange}
                        variant="outlined"
                    >
                    </TextField>
                </Grid>

                  <Grid item xs={12} sm={12} md={3}> 
                    <TextField
                        error={Boolean(touched.heightInch && errors.heightInch)}
                        helperText={touched.heightInch && errors.heightInch}
                        type="number"
                        label="Height : inch"
                        name="heightInch"
                        value={values.heightInch}
                        onChange={handleChange}
                        variant="outlined"
                    >
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        error={Boolean(touched.weight && errors.weight)}
                        helperText={touched.weight && errors.weight}
                        type="number"
                        label="Weight : pounds"
                        name="weight"
                        value={values.weight}
                        onChange={handleChange}
                        variant="outlined"
                    >
                    </TextField>
                  </Grid>

                </Grid>
              </Box>
            </CardContent>
           
            <DialogActions >
                <Button
                  color='secondary'
                  variant="outlined"
                  type='submit'
                  disabled={isSubmitting}
                >
                  {'Calculate'}
                </Button>
            </DialogActions>


            {/* <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre> */}
              {BMIResult&&(
              <Grid item xs={12} md={12}>
              
                <Typography align='left' color='textPrimary' variant='h3' component='h2'>
                  {'Result:'}
                </Typography>

                <Typography align='left' color='textSecondary' variant='h4' component='h2'>
                  {`Your BMI is ${BMIResult}. `}
                </Typography>
                    
              </Grid>
            )}

            </Box>

          </form>
        )
      }}
    </Formik>
  )
}

export default BMICalculator