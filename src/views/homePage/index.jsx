import React, {useEffect, useState, useCallback} from 'react'
import { reduxDispatch } from '../../store/index'
import { useHistory } from 'react-router-dom'
import { setNavPosition } from '../../slices/navbar'
import { fetchRandomRecipe } from '../../slices/recipes'
import ErrorBar from '../errors/ErrorBar';
import Page from '../../components/Page'
import Result from './Result'

let init =false;

export default function Index() {
    const dispatch=reduxDispatch()
    const history = useHistory()

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

    const fetchingRandomRecipes = useCallback(async (number) => {
        if(!init){
            try{
            init=true;
            const result = await dispatch(fetchRandomRecipe(number))
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
                console.error(e)
            }
        } 
    },[dispatch])

    useEffect(()=>{
        fetchingRandomRecipes(4)
    },[dispatch, fetchingRandomRecipes])

    useEffect(() => {
        if(history.location.pathname==='/'){
            dispatch(setNavPosition(0))
        }
    }, [dispatch, history])

    return (
        <Page title='Home' >
            {errorState.open&& 
                <ErrorBar 
                    errorState={errorState}
                    handleClose={handleClose}
                />
            }

            <Result/>
        </Page>
    )
}
