import React, {useState} from 'react'
import SlideShow from '../../components/slideshow/SlideShow';

import { 
    Container,
    makeStyles,
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    LinearProgress,
} from '@material-ui/core';

import FoodGallery from '../../components/RecipeDisplay/FoodGallery'
import HeaderDivider from '../../components/HeaderDivider'

import {
    reduxDispatch,
    reduxSelector,
} from '../../store/index'

import { fetchRandomRecipe } from '../../slices/recipes'
import ErrorBar from '../errors/ErrorBar'

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

                <Box mt={5}>
                    <Typography align='center' gutterBottom={true}>
                            {mobileDevice ?<h4>Featured articles:</h4>:<h3>Featured articles:</h3>}
                    </Typography>
                    <HeaderDivider/>
                    <Box m={2} align='center'>
                        <SlideShow/>
                    </Box>
                </Box>

                <Box mt={5}>
                  
                    <Typography align='center' gutterBottom={true}>
                        {mobileDevice ?<h4>Random Recipes:</h4>:<h3>Random Recipes:</h3>}
                    </Typography>
                    <HeaderDivider/>
                    <Box m={2} align='center'>
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
                        size="large">
                        Generate Random Recipes
                    </Button>
                    </Box>

                    {isLoading
                    ?<LinearProgress color="secondary" />
                    :<FoodGallery />
                    }
                </Box>

            </Container>
        </React.Fragment>
    )
}
