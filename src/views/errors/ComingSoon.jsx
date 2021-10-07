import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  makeStyles
} from '@material-ui/core';
import Page from '../../components/Page';
import { 
    IoArrowUndoOutline as ReturnIcon,
} from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:'5vh',
    paddingBottom:'5vh',
    display: 'flex',
    alignItems: 'center',
  },
  card:{
      paddingTop:'20vh',
      height:'90vh'
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  }
}));

const ComingSoon = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page
      className={classes.root}
      title="Feature Coming Soon"
    >
      <Container maxWidth="lg">
        <Paper className={classes.card} elevation={3} >
            <Typography
            align="center"
            variant={mobileDevice ? 'h4' : 'h1'}
            color="textPrimary"
            >
                New Feature Coming Soon
            </Typography>

            <Typography
            align="center"
            variant="subtitle2"
            color="textSecondary"
            >
                New feature is currently under development
            </Typography>
              <Box
                mt={6}
                display="flex"
                justifyContent="center"
                >
                <img
                    alt="Under development"
                    className={classes.image}
                    src="/images/coming-soon.webp"
                />
            </Box> 
        
            <Box
            mt={6}
            display="flex"
            justifyContent="center"
            >
              <Button
                color="secondary"
                component={Link}
                to="/"
                variant="outlined"
                startIcon={<ReturnIcon />}
              >
                Back to home
              </Button>
            </Box>
        </Paper>
      </Container>
    </Page>
  );
};

export default ComingSoon;
