import React, {useEffect} from 'react'
import Result from './Result'
import Page from '../../components/Page'
import Narbar from '../navBar/Narbar'
import recipeApi from '../../api/recipeApi'

import { 
    Divider,
    Paper,
    Container,
    makeStyles
} from '@material-ui/core'

import {
    reduxDispatch,
    reduxSelector
  } from '../../store/index'

import { fetchRandomRecipe } from '../../slices/recipes'


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

    // useEffect(()=>{
    //     // console.log('fetching inital recipe data')
    //     dispatch(fetchRandomRecipe(2))
    // },[dispatch])

    const classes =useStyles()
    return (
        <Page title='Home'>
            <Container size='lg' className={classes.root} >
                <Paper elevation={4} className={classes.content}>
                    <Narbar />
                    <Divider />
                    <Result/>
                    {/* <button onClick={()=>{
                        console.log('sending request')
                        dispatch(fetchRandomRecipe(4))
                    }}>Send Request</button> */}
                </Paper>
            </Container>
        </Page>
    )
}
