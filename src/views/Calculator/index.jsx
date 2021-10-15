import React, {useState, useEffect} from 'react'
import Page from '../../components/Page'
import BMICalculator from './CalculatorForm/BMICalculator'
import CalorieCalculator from './CalculatorForm/CalorieCalculator'
import { 
    Box,
    Tabs,
    Tab,
    Divider,
    Paper,
    makeStyles
} from '@material-ui/core'

import { resetResults } from '../../slices/calculator'
import { reduxDispatch } from '../../store/index'
import { useHistory } from 'react-router-dom'
import { setNavPosition } from '../../slices/navbar'

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
    tabMenu:{
        fontFamily:'Zen Dots',
        fontSize:'13px'
    }
})

export default function Index() {
    const classes =useStyles()
    const dispatch = reduxDispatch()
    const history = useHistory()

    useEffect(() => {
        if(history.location.pathname==='/calculator'){
            dispatch(setNavPosition(1))
        }
    }, [dispatch, history])
    
    const tabs=[
        {
            label:'BMI Calculator',
            value:'BMI'
        },
        {
            label:'Calorie Calculator',
            value:'Calorie'
        }
        ]
        const [currentTab, setCurrentTab]=useState('BMI')
    
        const handleTabsChange =(event,value)=>{
            setCurrentTab(value)

        }

    useEffect(()=>{
        // console.log('useEffect running resetting results')
        dispatch(resetResults())
    },[dispatch, currentTab])

    return (
        <Page title='Calculator'>
            <Box m={3} component={Paper}>
                <Box p={2}>
                    <Tabs
                        onChange={handleTabsChange}
                        scrollButtons='auto'
                        value={currentTab}
                        variant='scrollable'
                        textColor='Primary'
                    >
                        {tabs.map((tab) => (
                        <Tab className={classes.tabMenu} key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                    </Tabs>
                    <Divider />
                </Box>

                {currentTab==='BMI'&& <BMICalculator />}
                {currentTab==='Calorie'&& <CalorieCalculator />}
            </Box>
        </Page>
    )
}

