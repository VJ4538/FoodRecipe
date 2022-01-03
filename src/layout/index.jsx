import React from "react";
import Narbar from "./navBar/Narbar";
import { Divider, Paper, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: `${theme.spacing(0.5)}vh`,
    paddingBottom: `${theme.spacing(0.5)}vh`,
  },
  content: {
    height: "80vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.light,
    borderTopRightRadius: theme.spacing(0),
    borderTopLeftRadius: theme.spacing(0),
  },
  navBar: {
    borderBottomRightRadius: theme.spacing(0),
    borderBottomLeftRadius: theme.spacing(0),
  },
}));

const Index = ({ children }) => {
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
