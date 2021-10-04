import React from 'react'
import { 
    Typography,
} from '@material-ui/core'

//Progress bar
import {
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar";
import { easeQuadIn } from "d3-ease";
import AnimatedProgressProvider from  '../../components/AnimatedProgressProvider';

export default function CalorieBreakdown({amount}) {
 
    return (
        <AnimatedProgressProvider
        valueStart={0}
        valueEnd={amount}
        duration={1.2}
        easingFunction={easeQuadIn}
    >
        {value => {
        const roundedValue = Math.round(value);
        return (
            <CircularProgressbarWithChildren
            value={value}
            styles={buildStyles({
            pathColor: "#57CC99",
            trailColor: "#f7f7f0"
            })}
            >
                <Typography
                variant="h5"
                color='textSecondary'
                >
                    {roundedValue}% 
                </Typography>
                
            </CircularProgressbarWithChildren>
        );
        }}
    </AnimatedProgressProvider>
    )
}
