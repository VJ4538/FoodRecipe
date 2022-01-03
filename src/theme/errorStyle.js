const errorStyle = (theme) => {
  return {
    root: {
      paddingTop: `${theme.spacing(0.5)}vh`,
      paddingBottom: `${theme.spacing(0.5)}vh`,
      display: "flex",
      alignItems: "center",
    },
    card: {
      paddingTop: `${theme.spacing(2)}vh`,
      height: "90vh",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    image: {
      maxWidth: "100%",
      width: 560,
      maxHeight: 300,
      height: "auto",
    },
  };
};

export default errorStyle;
