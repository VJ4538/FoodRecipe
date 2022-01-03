import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  headerDivider: {
    width: "50px",
    borderRadius: "15px",
    borderBottom: `2px solid ${theme.palette.background.main}`,
    margin: `${theme.spacing(0.6)}px auto`,
    marginTop: theme.spacing(0.4),
  },
}));

const HeaderDivider = () => {
  const classes = useStyles();
  return <div className={classes.headerDivider}></div>;
};

export default React.memo(HeaderDivider);
