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
        height:'80vh',
        overflow:'auto',
        backgroundColor:'#F6F6F6',
        borderTopRightRadius:'0px',
        borderTopLeftRadius:'0px',
    },
    navBar:{
        borderBottomRightRadius:'0px',
        borderBottomLeftRadius:'0px',
    },
    tabMenu:{
        fontFamily:'Zen Dots',
        fontSize:'13px'
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
                <Paper elevation={4} className={classes.navBar}>
                    <Narbar />
                    <Divider />
                </Paper>
                <Paper elevation={4} className={classes.content}>
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
                </Paper>
            </Container>
        </Page>
    )
}

