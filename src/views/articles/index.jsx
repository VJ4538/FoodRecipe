import React, {useCallback, useEffect, useState}from 'react'
import Page from '../../components/Page'
import Result from './Result'
import data from '../../data/articles'
import { setNavPosition } from '../../slices/navbar'
import { reduxDispatch } from '../../store/index'

export default function Index(props) {
    const articleId=props.match.params.articleId
    const dispatch = reduxDispatch()

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

    useEffect(() => {
        dispatch(setNavPosition(4))
    }, [dispatch])

    return (
    <Page title={articleId}>
        <Result loading={isLoading} article={article}/>
    </Page>
    )
}
