import React, {useState} from 'react'

import { 
    Box,
    Tabs,
    Tab,
    Divider,
} from '@material-ui/core'

export default function Header() {

    const tabs=[
        {
            label:'US Units',
            value:'USUnit'
        },
        {
            label:'Metric Units',
            value:'MetricUnits'
        }
        ]
        const [currentTab, setCurrentTab]=useState('USUnit')
    
        const handleTabsChange =(event,value)=>{
            setCurrentTab(value)
        }

    return (
        <React.Fragment>
        <Box mt={3}>
        <Tabs
            onChange={handleTabsChange}
            scrollButtons='auto'
            value={currentTab}
            variant='scrollable'
            textColor='primary'
        >
            {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
        </Tabs>
        </Box>
        <Divider />
        </React.Fragment>
    )
}
