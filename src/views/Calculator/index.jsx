import React, {useState, useEffect} from 'react'
import Page from '../../components/Page'
import BMICalculator from './CalculatorForm/BMICalculator'
import CalorieCalculator from './CalculatorForm/CalorieCalculator'
import Narbar from '../navBar/Narbar'
import { 
    Box,
    Tabs,
    Tab,
    Divider,
    Paper,
    Container,
    makeStyles
} from '@material-ui/core'

import { resetResults } from '../../slices/calculator'
import { reduxDispatch } from '../../store/index'

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
    const classes =useStyles()
    const dispatch = reduxDispatch()

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

        //Reset results when tab change 
        useEffect(()=>{
            // console.log('useEffect running resetting results')
            dispatch(resetResults())
        },[dispatch, currentTab])

    return (
        <Page title='Calculators'>
            <Container size='lg' className={classes.root} >
                <Paper elevation={3} className={classes.content}>
                    <Narbar />
                    <Divider />
                    <Box p={3}>
                        <Tabs
                            onChange={handleTabsChange}
                            scrollButtons='auto'
                            value={currentTab}
                            variant='scrollable'
                            textColor='secondary'
                        >
                            {tabs.map((tab) => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                            ))}
                        </Tabs>
                    </Box>
                    {currentTab==='BMI'&& <BMICalculator />}
                    {currentTab==='Calorie'&& <CalorieCalculator />}
                    
                </Paper>
            </Container>
        </Page>
    )
}

