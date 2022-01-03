import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import {
  IoAlarmOutline as AlarmIcon,
  IoPeopleOutline as PeopleIcon,
} from "react-icons/io5";
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid rgba(87, 204, 153, 0.5)",
    "& .MuiButton-outlined": {
      marginRight: theme.spacing(0),
    },
    "& .MuiTypography-gutterBottom": {
      marginBottom: theme.spacing(1),
    },
  },
  image: {
    maxWidth: "100%",
    width: "100vh",
    maxHeight: 300,
    height: "auto",
  },
  cardActions: {
    paddingTop: theme.spacing(1),
    justifyContent: "end",
  },
  recipeIcon: {
    verticalAlign: "middle",
    marginRight: theme.spacing(0.5),
  },
}));

export default function FoodDisplayCard({ recipe }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {recipe.image && (
        <CardMedia
          component='img'
          alt={`${recipe.title} image`}
          image={recipe.image}
        />
      )}

      <CardContent>
        <Title title={recipe.title} includeDivider={false} align='left' />

        <Typography color='textSecondary' variant='h6'>
          <AlarmIcon className={classes.recipeIcon} />
          {`Ready In: ${
            recipe.readyInMinutes ? recipe.readyInMinutes : "N/A"
          } Min`}
        </Typography>

        <Typography color='textSecondary' variant='h6'>
          <PeopleIcon className={classes.recipeIcon} />
          {`Serving size: ${recipe.servings ? recipe.servings : "N/A"}`}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          component={Link}
          to={`/recipes/${recipe.id}`}
          color='secondary'
          variant='outlined'
          size='small'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
