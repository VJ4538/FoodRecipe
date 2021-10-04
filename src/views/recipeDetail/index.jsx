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
import ErrorBar from '../errors/ErrorBar'

const useStyles= makeStyles({
    root:{
        paddingTop:'5vh',
        paddingBottom:'5vh'
    },
    content:{
        paddingTop:'1%',
        height:'80vh',
        overflow:'auto',
        borderTopRightRadius:'0px',
        borderTopLeftRadius:'0px',
    },
    navBar:{
        borderBottomRightRadius:'0px',
        borderBottomLeftRadius:'0px',
    }
})


export default function Index(props) {
    // console.log(props)
    const classes =useStyles()
    const dispatch=reduxDispatch()
    const [isloading, setIsLoading]=useState(true)
    const [errorState, setErrorState] =useState({
        open:false,
        msg:'Something went Wrong!'
    });

    const recipeId=props.match.params.recipeId
    const isSearch=props.match.params.search
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return
        }
        setErrorState({
            ...errorState,
            open:false
        })
    };

    const fetchDetailRecipeData = useCallback(async(recipeId) => {
        try{
            const result = await dispatch(fetchRecipeDetail(recipeId))
            // console.log(result)
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
                // console.error(e)
            }
        setIsLoading(false)
      }, [dispatch]);

    useEffect(()=>{
        fetchDetailRecipeData(recipeId)
    },[recipeId,fetchDetailRecipeData])

    const recipe = reduxSelector(store=>store.recipeDetail)

    return (
        <Page title='Recipe Detail'>
            <Container size='lg' className={classes.root} >
                {errorState.open&& 
                    <ErrorBar 
                        errorState={errorState}
                        handleClose={handleClose}
                    />
                }
                <Paper elevation={4} className={classes.navBar}>
                    <Narbar />
                    <Divider />
                </Paper>
                <Paper elevation={4} className={classes.content}>
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
