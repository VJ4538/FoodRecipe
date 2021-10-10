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
import Title from '../../components/Title';

import { useHistory } from 'react-router-dom';



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
        maxHeight:'450px',
        overflow:'auto'
    }
}));

export default function RecipeDetail({recipe}) {
    const classes = useStyles();
    const history =useHistory()
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
                        onClick={()=>{
                            history.goBack()
                        }}
                        variant="outlined"
                        startIcon={<ReturnIcon />}
                        >
                        {'Go Back'}
                    </Button>
                </Grid>

                {/* <Title title={'Recipe Detail:'} includeDivider={true} /> */}

              <Grid container   
                direction="row"
                justifyContent="space-evenly"
                spacing={2}
                >
                    <Grid lg={6} md={6} sm={6} item >
                        <Box mt={2} mb={1} >
                            <Title title={recipe&&recipe.title} includeDivider={true} />
                        </Box>
                        <CardMedia
                            component="img"
                            alt={`${recipe.title} image`}
                            image={recipe.image}
                        />
                        <Box mt={2} className={classes.flexContainer}>
                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <AlarmIcon className={classes.recipeIcon} /> 
                                {`Ready In: ${recipe.readyInMinutes?recipe.readyInMinutes:'N/A'} Min`}
                            </Typography>

                            <Typography color="textSecondary" variant="h6" gutterBottom>
                                <PeopleIcon className={classes.recipeIcon} /> 
                                {`Servings: ${recipe.servings?recipe.servings:'N/A'}`}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid lg={6} md={6} sm={6} item >
                        <Box mt={2} mb={1} >
                            <Title title='Ingredients' includeDivider={true} />
                        </Box>
                        <Box className={classes.Ingredients} >
                            <Table size="small" stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="65%" className={classes.THeader}>Name</TableCell>
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
                                        }else{
                                            return ""
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Grid>
                </Grid>

                <NutritionDetail recipe={recipe}/>

                <Box mt={2} mb={1} >
                    <Title title='Instruction:' includeDivider={true} />
                </Box>
                <List>
                {recipe.analyzedInstructions[0].steps.length>0?
                    recipe.analyzedInstructions[0].steps.map((each,idx) => {
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
                            <Typography color="textSecondary" variant="body2" >
                                {`${idx+1}:  ${each.step?each.step:'N/A'}`}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    );
                })
                :<ListItemText primary={`No Instructions from recivied from sponcular.`} />
                }
                </List>
            </Container>
        </React.Fragment>
    )
}
