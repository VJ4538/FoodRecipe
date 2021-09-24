import React from 'react'
import SlideShow from '../../components/slideshow/SlideShow';

import { 
    Container,
    makeStyles,
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';

import FoodGallery from '../../components/RecipeDisplay/FoodGallery'
import HeaderDivider from '../../components/HeaderDivider'

import {
    reduxDispatch,
} from '../../store/index'

import { fetchRandomRecipe } from '../../slices/recipes'

const useStyles = makeStyles((theme) => ({
    root: {
    },
  }));

export default function Result() {
    const classes =useStyles()
    const dispatch=reduxDispatch()
    const theme = useTheme()
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <React.Fragment>
            <Container 
                maxWidth="lg"
                className={classes.root}
            >
                <Box mt={5}>
                    <SlideShow/>
                </Box>

                <Box mt={5}>
                  
                    <Typography align='center' gutterBottom={true}>
                        {mobileDevice ?<h4>Random Recipes:</h4>:<h3>Random Recipes:</h3>}
                    </Typography>
                    <HeaderDivider/>
                    <Box m={2} align='center'>
                    <Button
                        onClick={()=>{
                            dispatch(fetchRandomRecipe(4))
                        }}
                        color='secondary' 
                        variant="outlined" 
                        size="large">
                        Generate Random Recipes
                    </Button>
                    </Box>
                    <FoodGallery />
                </Box>

            </Container>
        </React.Fragment>
    )
}
