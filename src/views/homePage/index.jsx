import React, {useEffect, useState} from 'react'
import Result from './Result'
import Page from '../../components/Page'
import Narbar from '../navBar/Narbar'
import { 
    Divider,
    Paper,
    Container,
    makeStyles
} from '@material-ui/core'

import {
    reduxDispatch,
} from '../../store/index'

import { fetchRandomRecipe } from '../../slices/recipes'
import ErrorBar from '../errors/ErrorBar';

let init =false;

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


export default function Index() {
    const dispatch=reduxDispatch()
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

    useEffect(()=>{
        if(!init){
            try{
            init=true;
            const result = dispatch(fetchRandomRecipe(4))
            result.then((result)=>{
                if(result.error){
                    // console.log(result.error)
                    const errorType =result.error.message.split("")
                    const msg =errorType[errorType.length-1]==='404'?'Error Code 404 bad request':'Reach max amount of request for current Spoonacular API Plan'
        
                    setErrorState({
                        msg:msg,
                        open:true
                      })
                }
            })
            }catch(e){
                // console.error(e)
            }
        } 
    },[dispatch])

    const classes =useStyles()
    return (
        <Page title='Home'>
            <Container size='lg' className={classes.root} >
                {errorState.open&& 
                    <ErrorBar 
                        errorState={errorState}
                        handleClose={handleClose}
                    />
                }
                <Paper elevation={4} className={classes.content}>
                    <Narbar />
                    <Divider />
                    <Result/>
                </Paper>
            </Container>
        </Page>
    )
}
