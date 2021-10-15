import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { setNavPosition } from '../../slices/navbar'
import { reduxDispatch } from '../../store/index'
import SearchForm from './SearchForm'
import Page from '../../components/Page'

export default function Index(props) {
    const history = useHistory()
    const dispatch=reduxDispatch()

    useEffect(() => {
        if(history.location.pathname==='/search'){
            dispatch(setNavPosition(2))
        }
    }, [dispatch, history])

    return (
        <Page title='Search'>
            <SearchForm />
        </Page>
    )
}
