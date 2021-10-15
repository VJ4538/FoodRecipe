import React, {useEffect, useCallback, useState} from 'react'
import Page from '../../components/Page'
import RecipeDetail from './RecipeDetail'

import { LinearProgress } from '@material-ui/core'

import {
    reduxDispatch,
    reduxSelector
  } from '../../store/index'

import { fetchRecipeDetail } from '../../slices/recipeDetail'
import ErrorBar from '../errors/ErrorBar'

import { setNavPosition } from '../../slices/navbar'

export default function Index(props) {
    // console.log(props)
    const dispatch=reduxDispatch()
    const [isloading, setIsLoading]=useState(true)
    const [errorState, setErrorState] =useState({
        open:false,
        msg:'Something went Wrong!'
    });

    const recipe = reduxSelector(store=>store.recipeDetail)
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

    useEffect(() => {
            dispatch(setNavPosition(4))
    }, [dispatch])

    return (
        <Page title='Recipe Detail'>
                {errorState.open&& 
                    <ErrorBar 
                        errorState={errorState}
                        handleClose={handleClose}
                    />
                }
                    {isloading?
                        <LinearProgress />
                    :
                        recipe.recipeDetail &&
                    <RecipeDetail recipe={recipe.recipeDetail} isSearch={isSearch} />
                }
        </Page>
    )
}
