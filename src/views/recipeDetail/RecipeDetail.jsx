import React, { useState } from "react";
import {
  makeStyles,
  CardMedia,
  Box,
  Button,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@material-ui/core";

//Material ui 5.0
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  IoAlarmOutline as AlarmIcon,
  IoPeopleOutline as PeopleIcon,
  IoArrowUndoOutline as ReturnIcon,
} from "react-icons/io5";
import NutritionDetail from "./NutritionDetail";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { useHistory } from "react-router-dom";
import tableStyle from "../../theme/tableStyle";

const useStyles = makeStyles((theme) => ({
  root: {},
  recipeDetailContainer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(0),
  },
  recipeIcon: {
    verticalAlign: "middle",
    marginRight: theme.spacing(0.5),
  },
  Ingredients: {
    maxHeight: "450px",
    overflow: "auto",
  },
  ...tableStyle(theme),
}));

const RecipeDetail = ({ recipe }) => {
  const classes = useStyles();
  const history = useHistory();
  const [checked, setChecked] = useState([]);
  const recipeDetail =
    recipe.analyzedInstructions[0].steps &&
    recipe.analyzedInstructions[0].steps;

  const handleToggle = (value) => () => {
    const notChecked = checked.indexOf(value) === -1;
    let newCheckedArray = [...checked];
    if (notChecked) {
      newCheckedArray.push(value);
    } else {
      newCheckedArray = newCheckedArray.filter((each) => each.number === value);
    }

    setChecked(newCheckedArray);
  };

  return (
    <Box p={4} className={classes.recipeDetailContainer}>
      <Box align='right'>
        <Button
          color='secondary'
          component={Link}
          onClick={() => {
            history.goBack();
          }}
          variant='outlined'
          startIcon={<ReturnIcon />}>
          {"Go Back"}
        </Button>
      </Box>

      <Grid container justifyContent='space-evenly' spacing={2}>
        <Grid lg={6} md={6} sm={6} item>
          <Box mt={2} mb={1}>
            <Title title={recipe && recipe.title} includeDivider={true} />
          </Box>

          <CardMedia
            component='img'
            alt={`${recipe.title}`}
            image={recipe.image}
          />

          <Box mt={2} display='flex' container justifyContent='space-evenly'>
            <Typography color='textSecondary' variant='h6' gutterBottom>
              <AlarmIcon className={classes.recipeIcon} />
              {`Ready In: ${
                recipe.readyInMinutes ? recipe.readyInMinutes : "N/A"
              } Min`}
            </Typography>

            <Typography color='textSecondary' variant='h6' gutterBottom>
              <PeopleIcon className={classes.recipeIcon} />
              {`Servings: ${recipe.servings ? recipe.servings : "N/A"}`}
            </Typography>
          </Box>
        </Grid>

        <Grid lg={6} md={6} sm={6} item>
          <Box mt={2} mb={1}>
            <Title title='Ingredients' includeDivider={true} />
          </Box>
          <Box className={classes.Ingredients}>
            <Table size='small' stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell width='65%' className={classes.THeader}>
                    Name
                  </TableCell>
                  <TableCell className={classes.THeader}>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipe.extendedIngredients.map((each) => {
                  if (each.id) {
                    return (
                      <TableRow key={each.id}>
                        <TableCell>
                          {each.name[0].toUpperCase()}
                          {each.name.substring(1)}
                        </TableCell>
                        <TableCell>
                          {each.amount.toFixed(2)} {each.unit}
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return "";
                  }
                })}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>

      <NutritionDetail recipe={recipe} />

      <Box mt={2} mb={1}>
        <Title title='Instruction:' includeDivider={true} />
      </Box>
      <List>
        {recipeDetail ? (
          recipeDetail.map((each) => {
            return (
              <ListItem key={each.number} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(each.number)}
                  dense>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked.indexOf(each.number) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": each.number }}
                    />
                  </ListItemIcon>
                  <Typography color='textSecondary' variant='body2'>
                    {`${each.number}:  ${each.step ? each.step : "N/A"}`}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <ListItemText primary={`No Instructions data from sponcular.`} />
        )}
      </List>
    </Box>
  );
};

export default RecipeDetail;
