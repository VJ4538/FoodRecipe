import React from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Button,
    Typography,
    makeStyles,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';

import { 
    IoAlarmOutline as AlarmIcon,
    IoPeopleOutline as PeopleIcon,
    IoFastFoodOutline as FoodIcon,
  } from "react-icons/io5";
  

const useStyles = makeStyles({
    root: {
      minWidth: 350,
      '& .MuiButton-outlined': {
        marginRight: '0'
      },
      '& .MuiTypography-gutterBottom': {
        marginBottom: '0.5rem'
      },
    },
    image: {
        maxWidth: '100%',
        width: '100vh',
        maxHeight: 300,
        height: 'auto'
    } ,
    cardActions:{
        paddingTop:'10px',
        justifyContent:'end',
    },
    recipeIcon:{
        verticalAlign:'middle',
        marginRight:'5px',
    }

  });
  

export default function FoodDisplayCard({recipe}) {

    const classes = useStyles();
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    return (
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt={`${recipe.title} image`}
                    image={recipe.image}
                />

                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        {mobileDevice ?<h4>{recipe.title}:</h4>:<h3>{recipe.title}:</h3>}
                    </Typography>

                    {/* <Typography color="textPrimary" variant={mobileDevice?'h5':'h4'} component={mobileDevice?'h5':'h4'} gutterBottom>
                        <FoodIcon className={classes.recipeIcon} /> 
                        {`Calorie: ${recipe.readyInMinutes?recipe.readyInMinutes:'N/A'}`}
                    </Typography> */}

                    <Typography color="textPrimary" variant={mobileDevice?'h5':'h4'} component={mobileDevice?'h5':'h4'} gutterBottom>
                        <AlarmIcon className={classes.recipeIcon} /> 
                        {`Ready In: ${recipe.readyInMinutes?recipe.readyInMinutes:'N/A'} Min`}
                    </Typography>

                    <Typography color="textPrimary" variant={mobileDevice?'h5':'h4'} component={mobileDevice?'h5':'h4'} >
                        <PeopleIcon className={classes.recipeIcon} /> 
                        {`Serving size: ${recipe.servings?recipe.servings:'N/A'}`}
                    </Typography>

                </CardContent>

                <CardActions className={classes.cardActions} >
                    <Button 
                        component={Link}
                        to={`/recipe/${recipe.id}`}
                        color='secondary' 
                        variant="outlined" 
                        size="small">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
    )
}
