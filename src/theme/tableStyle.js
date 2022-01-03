const tableStyle = (theme) => {
  return {
    table: {
        margin: `${theme.spacing(0.1)}rem 0`,
    },
    THeader: {
      fontWeight: "bold",
      backgroundColor: theme.palette.background.dark,
    },
  };
};

export default tableStyle;
