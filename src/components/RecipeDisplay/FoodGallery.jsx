import React from 'react'
import { 
    Grid,
    Box,
  } from '@material-ui/core';
import FoodDisplayCard from './FoodDisplayCard';
import { reduxSelector } from '../../store/index'

export default function FoodGallery() {

    const recipeData = reduxSelector(store=>store.recipes.recipeData)
    // console.log(recipeData)
    return (
        <Box m={2}>
        <Grid container spacing={4}>

        { recipeData&&recipeData.map((each)=>{
                return(
                <Grid lg={6} md={6} sm={12} item>
                    <FoodDisplayCard recipe={each}/>
                </Grid>
                )
            })
        }
        </Grid>
        </Box>
    )
}
