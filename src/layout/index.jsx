import React from 'react';
import Narbar from './navBar/Narbar';
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
        height:'80vh',
        overflow:'auto',
        backgroundColor:'#F6F6F6',
        borderTopRightRadius:'0px',
        borderTopLeftRadius:'0px',
    },
    navBar:{
        borderBottomRightRadius:'0px',
        borderBottomLeftRadius:'0px',
    }
})

const Index = ( {children} )=> {

  const classes = useStyles();
  return (
        <Container size='lg' className={classes.root}>
            <Paper elevation={4} className={classes.navBar}>
                <Narbar />
                <Divider />
            </Paper>
            <Paper elevation={4} className={classes.content}>
                {children}
            </Paper>
        </Container>
  );
};


export default Index;
