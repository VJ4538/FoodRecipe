import React from 'react'
import { 
    Grid,
    Box,
  } from '@material-ui/core';
import FoodDisplayCard from './FoodDisplayCard';

export default function FoodGallery({data, md ,lg ,sm ,xs}) {

    return (
        <Box m={2}>
        <Grid container spacing={4}>

        {data&&data.map((each)=>{
                return(
                <Grid lg={lg} md={md} sm={sm} xs={xs} item>
                    <FoodDisplayCard recipe={each}/>
                </Grid>
                )
            })
        }
        </Grid>
        </Box>
    )
}
