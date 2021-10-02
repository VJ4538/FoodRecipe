import React, {useEffect, useCallback, useState} from 'react'
import Page from '../../components/Page'
import Narbar from '../navBar/Narbar'
import RecipeDetail from './RecipeDetail'

import { 
    Divider,
    Paper,
    Container,
    makeStyles,
    LinearProgress,
} from '@material-ui/core'

import {
    reduxDispatch,
    reduxSelector
  } from '../../store/index'

import { fetchRecipeDetail } from '../../slices/recipeDetail'

const useStyles= makeStyles({
    root:{
        paddingTop:'5vh',
        paddingBottom:'5vh'
    },
    content:{
        paddingTop:'1%',
        height:'90vh',
        overflow:'auto'
    }
})


export default function Index(props) {
    // console.log(props)
    const classes =useStyles()
    const dispatch=reduxDispatch()
    const [isloading, setIsLoading]=useState(true)

    const recipeId=props.match.params.recipeId
    const isSearch=props.match.params.search

    const fetchDetailRecipeData = useCallback(async(recipeId) => {
        const result = await dispatch(fetchRecipeDetail(recipeId))
        // console.log(result)
        setIsLoading(false)
      }, [dispatch]);

    useEffect(()=>{
        fetchDetailRecipeData(recipeId)
    },[recipeId,fetchDetailRecipeData])

    const recipe = reduxSelector(store=>store.recipeDetail)

    return (
        <Page title='Recipe Detail'>
            <Container size='lg' className={classes.root} >
                <Paper elevation={4} className={classes.content}>
                    <Narbar />
                    <Divider />
                    {isloading?
                        <LinearProgress />
                    :
                        recipe.recipeDetail &&
                        <RecipeDetail recipe={recipe.recipeDetail} isSearch={isSearch} />
                    }
                    
                </Paper>
            </Container>
        </Page>
    )
}
