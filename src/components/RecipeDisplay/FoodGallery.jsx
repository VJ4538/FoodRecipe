import React from 'react'

import { 
    makeStyles,
    Grid,
    LinearProgress
  } from '@material-ui/core';

import FoodDisplayCard from './FoodDisplayCard';


import {
    reduxSelector
  } from '../../store/index'


const useStyles = makeStyles({
    root: {
      minWidth: 300,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },

  });


export default function FoodGallery() {

    const classes = useStyles();

    const recipeData = reduxSelector(store=>store.recipes.recipeData)
    const isLoading =reduxSelector(store=>store.recipes.loading)
    // console.log(recipeData)

    return (
        <Grid container spacing={4}>
        {/* {(isLoading&&recipeData)
        ?
            <Grid lg={12} md={12} sm={12} item>
                <LinearProgress color="secondary" />
            </Grid>
        :(
            recipeData&&recipeData.map((each)=>{
                return(
                <Grid lg={6} md={6} sm={12} item>
                    <FoodDisplayCard recipe={each}/>
                </Grid>
                )
            })
        )
        } */}

        { recipeData&&recipeData.map((each)=>{
                return(
                <Grid lg={6} md={6} sm={12} item>
                    <FoodDisplayCard recipe={each}/>
                </Grid>
                )
            })
        }

        

        </Grid>
    )
}
