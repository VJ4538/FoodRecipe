import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { setNavPosition } from '../../slices/navbar'
import { reduxDispatch } from '../../store/index'
import Result from './Result'
import Page from '../../components/Page'

export default function Index(props) {
    const history = useHistory()
    const dispatch=reduxDispatch()

    useEffect(() => {
        if(history.location.pathname==='/mealplan'){
            dispatch(setNavPosition(3))
        }
    }, [dispatch, history])

    return (
        <Page title='Meal Plan'>
            <Result />
        </Page>
    )
}
