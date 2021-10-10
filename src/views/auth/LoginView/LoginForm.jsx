import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

import {
    Box,
    Button,
    DialogActions,
    Grid,
    TextField,
    InputAdornment,
    makeStyles,
    Paper,
} from '@material-ui/core'

import { RemoveRedEye } from '@material-ui/icons'

import Title from '../../../components/Title'

import firebaseApi from '../../../api/firebaseApi'

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
    eye: {
        cursor: 'pointer',
    },
    forms:{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        padding: theme.spacing(3),
        paddingTop: 60,
        paddingBottom: 80,
    }
  }));
  

export default function LoginForm() {
    const classes = useStyles()

    const [passwordMask, setPasswordMask]=useState(true);

    const togglePasswordMask=(e)=>{
      setPasswordMask((prevs)=>{
        return !prevs
      })
    }

    return (
        <React.Fragment>
            <Formik
                validateOnChange={true}
                // validateOnBlur={false}
                initialValues={{
                    email:'',
                    password:'',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                    .min(1, 'Please enter a valid weight')
                    .required('Please enter a valid weight'),
                    password: Yup.string()
                    .min(6, 'Password can not be less than 6 characters')
                    .required('Please enter a valid password'), 
                })}

                onSubmit={async (
                    values,
                    { resetForm }
                ) => {
                    // console.log(values)
                        // const result = await firebaseApi.signUpWithEmail(values.email,values.password)
                        let recipes= 
                        [
                            {
                                id:123123,
                                name:'food1'
                            }
                        ]
                           
                        
                        firebaseApi.sendData('user1',recipes)
                    try{

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
                    <Box className={classes.forms}>
                        <form
                            onSubmit={handleSubmit}
                        >   
                        <Box p={4} 
                             component={Paper}
                             sx={{
                                width: 500,
                                maxWidth: '100%',
                             }}
                        >  
                            <Box mb={2}>
                                <Title title="Login" includeDivider={true} />  
                            </Box>

                            <Grid container spacing={2}>
                        
                                <Grid item xs={12} sm={12} md={12}> 
                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                        label="Email:"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    >
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                        type={passwordMask?'password':'text'}
                                        InputProps={{
                                        endAdornment: (
                                        <InputAdornment position="end">
                                            <RemoveRedEye
                                            className={classes.eye}
                                            onClick={togglePasswordMask}
                                            />
                                            </InputAdornment>
                                            ),
                                        }}
                                        label="Password:"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    >
                                    </TextField>
                                </Grid>

                            </Grid>
                    
                            <DialogActions >
                                <Button
                                color='secondary'
                                variant="outlined"
                                type='submit'
                                disabled={isSubmitting}
                                >
                                    {'Login'}
                                </Button>
                                
                                <Button
                                color='secondary'
                                variant="outlined"
                                type='submit'
                                disabled={isSubmitting}
                                >
                                    {'Register'}
                                </Button>
                            </DialogActions>

                        <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre>

                        </Box>
                    </form>
                </Box>
             )
            }}
            </Formik>
        </React.Fragment>
    )
}
