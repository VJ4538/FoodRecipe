import React, {useEffect, useCallback, useState} from 'react'
import Page from '../../components/Page'
import Narbar from '../navBar/Narbar'
import SearchForm from './SearchForm'

import { 
    Divider,
    Paper,
    Container,
    makeStyles,
} from '@material-ui/core'

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
    const classes =useStyles()

    return (
        <Page title='Search Recipe'>
            <Container size='lg' className={classes.root} >
                <Paper elevation={4} className={classes.content}>
                    <Narbar />
                    <Divider />
                    <SearchForm />
        
                </Paper>
            </Container>
        </Page>
    )
}
