import React, { useEffect } from 'react'
import { 
    BottomNavigation,
    BottomNavigationAction,
    Container,
    makeStyles,
    
} from '@material-ui/core'

import { Link } from 'react-router-dom';


import { 
  IoHomeOutline as HomeIcon,
  IoCalculatorOutline as CalculatorIcon,
  IoSearchOutline as SearchIcon,
  IoRestaurantOutline as PlanMealIcon,
} from "react-icons/io5";

const useStyles = makeStyles(theme=>({
    root: {
      paddingTop:'1rem',
      paddingBottom:'1rem',
      '& .Mui-selected': {
        borderBottom:'2px solid #57CC99'
      },
      '& .MuiBottomNavigationAction-root': {
        border:'none'
      },
    },
}));


const Narbar=()=>{
    const classes = useStyles();
    return (
      <Container size='lg' className={classes.root}>
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction 
              component={Link}
              to="/"
              label="Home" 
              icon={<HomeIcon size={35} />}    
              value={0}
          />

          <BottomNavigationAction 
              component={Link}
              to="/calculator"
              label="Calculator" 
              icon={<CalculatorIcon size={35}/>}    
          />

          <BottomNavigationAction 
              component={Link}
              to="/search"
              label="Search" 
              icon={<SearchIcon size={35}/>}      
          />

          <BottomNavigationAction 
              component={Link}
              to="/mealplan"
              label="Meal Plan" 
              icon={<PlanMealIcon size={35}/>} 
          />
        </BottomNavigation>
      </Container>
    )
}

export default Narbar