import React from 'react'
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
        height:'80vh',
        overflow:'auto',
        backgroundColor:'#F6F6F6',
        borderTopRightRadius:'0px',
        borderTopLeftRadius:'0px',
    },
    navBar:{
        borderBottomRightRadius:'0px',
        borderBottomLeftRadius:'0px',
    }
})


export default function Index(props) {
    const classes =useStyles()
    return (
        <Page title='Search Recipe'>
            <Container size='lg' className={classes.root} >
                <Paper elevation={4} className={classes.navBar}>
                    <Narbar />
                    <Divider />
                </Paper>
                <Paper elevation={4} className={classes.content}>
                    <SearchForm />
                </Paper>
            </Container>
        </Page>
    )
}
