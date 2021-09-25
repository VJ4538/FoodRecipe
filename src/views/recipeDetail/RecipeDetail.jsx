import React, { useState }from 'react'
import { 
    Container,
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
 } from '@material-ui/core'

 //Material ui 5.0
import { 
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'

import { 
    IoAlarmOutline as AlarmIcon,
    IoPeopleOutline as PeopleIcon,
    IoArrowUndoOutline as ReturnIcon
} from "react-icons/io5";

import NutritionDetail from './NutritionDetail';
import { Link } from 'react-router-dom';
import HeaderDivider from '../../components/HeaderDivider';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTypography-gutterBottom': {
          marginBottom: '0.5rem'
        },
      },
    recipeIcon:{
        verticalAlign:'middle',
        marginRight:'5px',
    },
    flexContainer:{
        display:'flex',
        justifyContent:'space-evenly'
    },
    THeader:{
        fontWeight:'bold',
        backgroundColor:theme.palette.background.dark
    },
    Ingredients:{
        maxHeight:'390px',
        overflow:'auto'
    }
}));

export default function RecipeDetail({recipe}) {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
      };
    return (
        <React.Fragment>
            <Container 
                maxWidth="lg"
            >   
            
                <Grid lg={12} md={12} sm={12} item mt={2} align='right'>
                    <Button
                        color="secondary"
                        component={Link}
                        to="/"
                        variant="outlined"
                        startIcon={<ReturnIcon />}
                        >
                        Back
                    </Button>
                </Grid>

                <Box mt={2}>
                    <Typography color="textPrimary" align='center'>
                        <h3>Recipe Detail:</h3>
                    </Typography>
                    <HeaderDivider/>
                </Box>

                <Grid container   
                direction="row"
                justifyContent="space-evenly"
                mt={2}
                >
                    <Grid lg={6} md={6} sm={6} item >
                        <Typography color="textPrimary" align='center' gutterBottom>
                            <h3>{recipe&&recipe.title}</h3>
                        </Typography>
                        <CardMedia
                            component="img"
                            alt={`${recipe.title} image`}
                            image={recipe.image}
                        />
                        <Box mt={2} className={classes.flexContainer}>
                            <Typography color="textPrimary" variant="h4" gutterBottom>
                                <AlarmIcon className={classes.recipeIcon} /> 
                                {`Ready In: ${recipe.readyInMinutes?recipe.readyInMinutes:'N/A'} Min`}
                            </Typography>

                            <Typography color="textPrimary" variant="h4" gutterBottom>
                                <PeopleIcon className={classes.recipeIcon} /> 
                                {`Servings: ${recipe.servings?recipe.servings:'N/A'}`}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid lg={5} md={5} sm={5} item className={classes.Ingredients}>
                            <Table size="small" stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="65%" className={classes.THeader}>Ingredient</TableCell>
                                        <TableCell className={classes.THeader}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recipe.extendedIngredients.map((each)=>{
                                        if(each.id){
                                            return(
                                                <TableRow>
                                                    <TableCell > {each.name}</TableCell>
                                                    <TableCell >{+each.amount.toFixed(2)} {each.unit} </TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                    </Grid>
                </Grid>

                <NutritionDetail recipe={recipe}/>

                <Box mt={2}>
                    <Typography color="textPrimary" align='center'>
                        <h3>Instruction:</h3>
                    </Typography>
                    <HeaderDivider/>
                </Box>
                <List>
                {recipe&&recipe.analyzedInstructions[0].steps.map((each,idx) => {
                    const labelId = `recipe-Instruction-${each.idx}`;
                    return (
                    <ListItem
                        key={`instruction-${each.idx}`}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(each)} dense>
                        <ListItemIcon>
                            <Checkbox
                            edge="start"
                            checked={checked.indexOf(each) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                            <ListItemText id={labelId} primary={`${idx+1}:  ${each.step?each.step:'N/A'}`} />
                        </ListItemButton>
                    </ListItem>
                    );
                })}
                </List>

            
            </Container>
        </React.Fragment>
    )
}