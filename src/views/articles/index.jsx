import React, {useCallback, useEffect, useState}from 'react'
import Page from '../../components/Page'
import Narbar from '../navBar/Narbar'
import Result from './Result'
import data from '../../data/articles'

import { 
    Divider,
    Paper,
    Container,
    makeStyles
} from '@material-ui/core'

const useStyles= makeStyles({
    root:{
        paddingTop:'5vh',
        paddingBottom:'5vh'
    },
    content:{
        paddingTop:'1%',
        height:'80vh',
        overflow:'auto'
    },
    navBar:{
        borderBottomRightRadius:'0px',
        borderBottomLeftRadius:'0px',
    }
})

export default function Index(props) {
    const articleId=props.match.params.articleId
    const classes =useStyles()

    const { articles } = data
    // console.log(articles)
    const [article, setArticle]= useState(null)
    const [isLoading, setIsLoading]=useState(true)

    const findTargetArticle = useCallback((data)=>{
        data.forEach((each)=>{
            if(each.link===articleId){
                setArticle(each)
                setIsLoading(false)
            }
        })
    },[articleId])

    useEffect(()=>{
        findTargetArticle(articles)
    },[findTargetArticle, articles])

    return (
    <Page title={articleId}>
        <Container size='lg' className={classes.root} >
            <Paper elevation={4} className={classes.navBar}>
                <Narbar />
                <Divider />
            </Paper>
            <Paper elevation={4} className={classes.content}>
                <Result loading={isLoading} article={article}/>
            </Paper>
        </Container>
    </Page>
    )
}
