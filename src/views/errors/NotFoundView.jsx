import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import Page from "../../components/Page";
import { IoArrowUndoOutline as ReturnIcon } from "react-icons/io5";
import errorStyle from "../../theme/errorStyle";

const useStyles = makeStyles((theme) => ({
  ...errorStyle(theme),
}));

const NotFoundView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page className={classes.root} title='404: Not found'>
      <Container maxWidth='lg'>
        <Paper className={classes.card} elevation={3}>
          <Typography
            align='center'
            variant={mobileDevice ? "h4" : "h1"}
            color='textPrimary'>
            Opps! 404 not found. The page you are looking for isn’t here
          </Typography>
          <Typography align='center' variant='subtitle2' color='textSecondary'>
            The requested URL was not found on this server
          </Typography>
          <Box mt={6} display='flex' justifyContent='center'>
            <img
              alt='Under development'
              className={classes.image}
              src='/images/404-error-page.png'
            />
          </Box>
          <Box mt={6} display='flex' justifyContent='center'>
            <Button
              color='secondary'
              component={Link}
              to='/'
              variant='outlined'
              startIcon={<ReturnIcon />}>
              Back to home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Page>
  );
};

export default NotFoundView;
