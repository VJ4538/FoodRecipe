import React from 'react'

import { 
    makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
    },
    headerDivider:{
        width:'50px',
        borderRadius:'15px',
        borderBottom:'2px solid #57CC99',
        margin:'0.3rem auto',
        marginTop:'0.2rem'
    }
  }));


export default function HeaderDivider() {
    const classes =useStyles()

    return (
        <div className={classes.headerDivider}>
        </div>
    )
}
