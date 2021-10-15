import React, { useState } from 'react'
import { Formik } from 'formik'

import {
    Box,
    Button,
    Chip,
    DialogActions,
    Grid,
    TextField,
    Typography,
    makeStyles,
    List,
    ListItem,
    ListItemText,
    Paper,
    useTheme,
    useMediaQuery,
    LinearProgress,
} from '@material-ui/core'

import {
    XCircle as XCircleIcon,
  } from 'react-feather'
  

import dietData from '../../data/dietType'

import Title from '../../components/Title'
import { reduxDispatch, reduxSelector } from '../../store'
import { generateMealPlan } from '../../slices/mealPlan'
import FoodGallery from '../../components/RecipeDisplay/FoodGallery'
import mealPlanInstructions from '../../data/mealPlanInstructions'
import ErrorBar from '../errors/ErrorBar'

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
    chips:{
        margin:'0.2rem 0.3rem',
        padding:'2px 4px',
        backgroundColor:'#57CC99 ',
        color:'#fff'
    },
    calorieBreakdown:{
        marginTop:'1rem',
        maxWidth:'200px',
        "@media (max-width: 768px)": {
          maxWidth:'150px',
          minWidth:'150px'
        }
      }
  }));
  

export default function Result() {
    const classes = useStyles()
    const dispatch =reduxDispatch()
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))
    const [isLoading, setIsLoading]=useState(false)
    const [errorState, setErrorState] =useState({
        open:false,
        msg:'Something went Wrong!'
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setErrorState({
            ...errorState,
            open:false
        })
    };
  

    const mealPlan = reduxSelector(store=>store.mealPlan)
    let nutritionDataArray=[]
    if(mealPlan.mealPlan){
        let nutritionData=mealPlan.mealPlan.nutrients;
        for(let each in nutritionData){
            nutritionDataArray.push({
                name:each[0].toUpperCase() + each.substring(1),
                amount:nutritionData[each]
            })
        }
    }

    return (
        <React.Fragment>
            {errorState.open&& 
                <ErrorBar 
                    errorState={errorState}
                    handleClose={handleClose}
                />
            }
          <Box m={3} component={Paper}>
                <Title title='Instructions:' includeDivider={true} />
                <Box p={1}>
                    <List>
                    {mealPlanInstructions.mealPlanInstructions&&mealPlanInstructions.mealPlanInstructions.map((each,idx) => {
                        return (
                        <ListItem
                            key={`instruction-${each.idx}`}
                            disablePadding
                        >
                        <ListItemText secondary={`${idx+1}:  ${each.step?each.step:'N/A'}`} />
                        </ListItem>
                        );
                    })}
                    </List>
                </Box>
            <Formik
                validateOnChange={true}
                // validateOnBlur={false}
                initialValues={{
                    dietType:'none',
                    excludeIngredient:'',
                    excludeIngredients:[],
                }}
                onSubmit={async (
                    values,
                    { resetForm }
                ) => {
                    setIsLoading(true)
                    try{
                        let query=''
                        let caloriesQuery=values.targetCalories?`&targetCalories=${values.targetCalories}`:''
                        let dietQuery=values.dietType==='none'?'':`&diet=${values.dietType}`
                        let exclude='';
                        if(values.excludeIngredients.length>0){
                            let excludeStr = values.excludeIngredients.join(',')
                            exclude=`&exclude=${excludeStr}`
                        }else{
                            exclude=''
                        }
                        query+=caloriesQuery+dietQuery+exclude

                        // console.log(query)
                        const result =await dispatch(generateMealPlan(query))
                        if(result.error){
                                // console.log(result.error)
                                const errorType =result.error.message.split("")
                                const msg =errorType[errorType.length-1]==='404'?'Error Code 404 bad request':'Reach max amount of request for current Spoonacular API Plan'
                                setErrorState({
                                    msg:msg,
                                    open:true
                                })
                        }else{
                            setIsLoading(false)
                        }
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
                        >   
                        <Box p={3} >  
                            <Box mb={2}>
                                <Title title="Generate your daily meal plan:" includeDivider={true} />  
                            </Box>

                            <Grid container spacing={2}>
                        
                                <Grid item lg={6} xs={12} md={6}>
                                    <TextField
                                        error={Boolean(touched.targetCalories && errors.targetCalories)}
                                        helperText={touched.targetCalories && errors.targetCalories}
                                        type='number'
                                        label="Target Calories:"
                                        name="targetCalories"
                                        value={values.targetCalories}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    >
                                    </TextField>
                                </Grid>

                                <Grid item lg={6} xs={12} md={6}>
                                    <TextField
                                        error={Boolean(touched.dietType && errors.dietType)}
                                        helperText={touched.dietType && errors.dietType}
                                        select
                                        SelectProps={{ native: true }}
                                        InputLabelProps={{ shrink: true }}
                                        label="Diet type"
                                        name="dietType"
                                        value={values.dietType}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    >
                                    <option key={'none'} value={'none'} >
                                        None
                                    </option>

                                    {dietData.dietType.map((each)=>{
                                        return(
                                        <option key={each.id} value={each.value} >
                                            {each.value}
                                        </option>
                                        )
                                    })
                                    }

                                    </TextField>
                                </Grid>

                                <Grid item lg={6} xs={12} md={12}>
                                    <Box display='flex'>
                                    <TextField
                                        error={Boolean(touched.excludeIngredient && errors.includeIngredient)}
                                        helperText={touched.excludeIngredient && errors.includeIngredient}
                                        label="Add exclude Ingredients"
                                        name="excludeIngredient"
                                        value={values.excludeIngredient}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    >
                                    </TextField>

                                    <Button
                                        variant="outlined"
                                        color='secondary'
                                        onClick={()=>{
                                        // console.log('test',values.includeIngredient)
                                        if(values.excludeIngredient!==''){
                                            setFieldValue(`excludeIngredients`, [...values.excludeIngredients,
                                            values.excludeIngredient], false)

                                            setFieldValue(`excludeIngredient`,'',false)
                                        }
                                    }}>
                                        Add
                                    </Button>
                                    </Box>
                                </Grid>
                                {values.excludeIngredients.length>0&&
                                    <Grid item lg={12} xs={12} md={12}>
                                        <Title title='Exclude Ingredients:' includeDivider={false} />
                                        
                                        <Box display='flex'>
                                        {values.excludeIngredients.map((each)=>{
                                            return(
                                            <Chip
                                                label={each}
                                                className={`${classes.chips} ${classes.root}`}
                                                onDelete={()=>{
                                                const filteredList= values.excludeIngredients.filter((eachItem)=>{
                                                    return eachItem!==each
                                                })
                                                setFieldValue(`excludeIngredients`, filteredList, false)

                                                }}
                                                deleteIcon={<XCircleIcon/>}
                                            />
                                            )
                                        })}
                                        </Box>
                                    </Grid>
                                }

                            </Grid>
                    
                            <DialogActions >
                                <Button
                                color='secondary'
                                variant="outlined"
                                type='submit'
                                disabled={isSubmitting}
                                >
                                    {'Generate'}
                                </Button>

                            </DialogActions>

                        {/* <pre className={classes.pre}>{JSON.stringify(values, null, 4)}</pre> */}

                        </Box>
                    </form>
             )
            }}
            </Formik>
            </Box>
         
            <Box mt={5} m={3} component={Paper}>
            {isLoading?
                <LinearProgress />:
                <>

                {mealPlan.mealPlan&&(
                <>
                    <Box m={2}>
                        <Title title='Nutrition facts of the meal' includeDivider={true} />
                    </Box>

                    <Grid 
                        container   
                        direction="row"
                        justifyContent="space-evenly"
                    >   
                    {nutritionDataArray.length>0&&nutritionDataArray.map((each)=>{
                        return(
                            <Grid item lg={6} md={6} sm={6} xs={12} >
                                <Box m={2}>
                                    <Typography color='textSecondary' variant={mobileDevice?'h6':'h5'} align='center' gutterBottom >
                                        {`${each.name}: ${each.amount} g`}
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                    })}

                    </Grid>
                    
                </>
                )}       

                {mealPlan.mealPlan&&(
                <>
                    <Box pb={2}>
                        <Title title='Meal:' includeDivider={true} />
                    </Box>
                    <FoodGallery 
                        data={mealPlan.mealPlan.meals} 
                        lg={4} 
                        md={4} 
                        sm={12} 
                        xs={12} 
                    /> 
                </>
                )
                }
                </>
            }

            </Box>
        </React.Fragment>
    )
}
