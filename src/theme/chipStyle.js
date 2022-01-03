const chipStyle = (theme) => {
  return {
    Chips: {
      margin: `${theme.spacing(0.4)}px ${theme.spacing(0.6)}px`,
      padding: `${theme.spacing(0.2)}px ${theme.spacing(0.4)}px`,
      backgroundColor: theme.palette.background.main,
      color: theme.palette.background.light,
      "& .MuiChip-deleteIcon": {
        color: "#FFF !important",
      },
    },
  };
};

export default chipStyle;
