import React from 'react'
import { 
    Typography,
    Box,
    Grid,
    makeStyles,
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    useTheme,
    useMediaQuery,
 } from '@material-ui/core'

import CalorieBreakdown from './CalorieBreakdown';
import Title from '../../components/Title';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
      },
      '& .MuiDialogActions-root': {
        paddingLeft:'16px',
        paddingRight:'16px'
      },
    },
    tableContainer:{
       width: '100%', 
       overflow: 'hidden' 
    },
    table:{
      maxHeight: '500px' 
    },
    THeader:{
      fontWeight:'bold',
      backgroundColor:theme.palette.background.dark
    },
    calorieBreakdown:{
      marginTop:'1rem',
      maxWidth:'200px',
      "@media (max-width: 768px)": {
        maxWidth:'150px',
        minWidth:'150px'
      }
    }
 }));

export default function NutritionDetail({recipe}) {
    const classes = useStyles()
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const { nutrition } =recipe
    const { caloricBreakdown }=nutrition

    return (
      <Box>
        <Box mt={2}>
          <Title title='Calorie Breakdown:' includeDivider={true} />
        </Box>
        <Grid 
          container   
          direction="row"
          justifyContent="space-evenly"
        >
          <Grid lg={4} md={6} sm={6} item className={classes.calorieBreakdown}>
              <Typography color='textSecondary' variant={mobileDevice?'h6':'h5'} align='center' gutterBottom >
                {`Protein percent:`}
              </Typography>
              <CalorieBreakdown amount={caloricBreakdown.percentProtein}/>
          </Grid>

          <Grid lg={4} md={6} sm={6} item className={classes.calorieBreakdown}>
              <Typography color='textSecondary' variant={mobileDevice?'h6':'h5'} align='center' gutterBottom >
                {`Fat percent:`}
              </Typography>
              <CalorieBreakdown amount={caloricBreakdown.percentFat}/>
          </Grid>

          <Grid lg={4} md={6} sm={6} item className={classes.calorieBreakdown}>
              <Typography color='textSecondary' variant={mobileDevice?'h6':'h5'} align='center' gutterBottom >
                {`Carbs percent:`}
              </Typography>
              <CalorieBreakdown amount={caloricBreakdown.percentCarbs}/>
          </Grid>
        </Grid>

        <Box mt={2} mb={2}>
          <Title title='Nutrients:' includeDivider={true} />
        </Box>
        
        <Grid 
          container   
          direction="row"
          justifyContent="space-evenly"
        >
          <Grid lg={12} md={12} sm={12} item >
          {recipe&&
            <Paper className={classes.tableContainer}>
              <TableContainer className={classes.table}>
                <Table size="small" stickyHeader >
                  <TableHead>
                    {['Nutritions', 'Amount'].map((each)=>{
                      return(
                        <TableCell width='50%' className={classes.THeader}>{each}</TableCell>
                      )
                    })}
                  </TableHead>
                  <TableBody>
                    {recipe.nutrition.nutrients.map((each,idx)=>{
                      return(
                        <TableRow key={`nutrition${idx}`} hover={true}>
                          <TableCell>{each.title&&each.title}</TableCell>
                          <TableCell>{each.amount&&each.amount} {each.unit&&each.unit}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
              
                </Table>
                </TableContainer>
              </Paper>
            }
          </Grid>
        </Grid>
      </Box>
    )
}
