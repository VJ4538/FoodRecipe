import React, {useState} from 'react'
import SlideShow from '../../components/slideshow/SlideShow';

import { 
    Container,
    makeStyles,
    Box,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
    Paper,
} from '@material-ui/core';

import FoodGallery from '../../components/RecipeDisplay/FoodGallery'
import {
    reduxDispatch,
    reduxSelector,
} from '../../store/index'

import { fetchRandomRecipe } from '../../slices/recipes'
import ErrorBar from '../errors/ErrorBar'
import Title from '../../components/Title';

const useStyles = makeStyles((theme) => ({
    root: {
    },
  }));

export default function Result() {
    const classes =useStyles()
    const dispatch=reduxDispatch()
    const theme = useTheme()
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))
    const isLoading =reduxSelector(store=>store.recipes.loading)
    const recipeData = reduxSelector(store=>store.recipes.recipeData)

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

    return (
        <React.Fragment>
            <Container 
                maxWidth="lg"
                className={classes.root}
            >
                {errorState.open&& 
                <ErrorBar 
                    errorState={errorState}
                    handleClose={handleClose}
                />}
            
                <Box mt={5} component={Paper}>
                    <Title title='Featured articles' includeDivider={true} />
                        <SlideShow/>
                </Box>

                <Box mt={5} component={Paper}>
                    <Title title='Random Recipes:' includeDivider={true} />
                    <Box m={2} pb={3} align='center'>
                        <Button
                            onClick={async()=>{
                                try{
                                    const result = await dispatch(fetchRandomRecipe(4))
                                    if(result.error){
                                        // console.log(result.error)
                                        const errorType =result.error.message.split("")
                                        const msg =errorType[errorType.length-1]==='404'?'Error Code 404 bad request':'Reach max amount of request for current Spoonacular API Plan'

                                        setErrorState({
                                            msg:msg,
                                            open:true
                                        })
                                    }
                                }catch(e){
                                    // console.log(e)
                                }
                            }}
                            color='secondary' 
                            variant="outlined" 
                            size={mobileDevice?"small":"medium"}
                            >
                            Generate Random Recipes

                        </Button>
                    </Box>

                    {isLoading
                    ?
                    <Box m={2} pb={2}>
                        <LinearProgress color="secondary" />
                    </Box>
                    :<FoodGallery 
                        data={recipeData}
                        lg={6} 
                        md={6} 
                        sm={12}
                    />
                    }                   
                </Box>

            </Container>
        </React.Fragment>
    )
}
