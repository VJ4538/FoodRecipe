import React from "react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  makeStyles,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import {
  IoHomeOutline as HomeIcon,
  IoCalculatorOutline as CalculatorIcon,
  IoSearchOutline as SearchIcon,
  IoRestaurantOutline as PlanMealIcon,
} from "react-icons/io5";
import { reduxSelector } from "../../store";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2.6),
    paddingBottom: theme.spacing(2.6),
    overflow: "atuo",
  },
  selected: {
    color: theme.palette.background.main,
  },
}));

const Narbar = () => {
  const classes = useStyles();

  const position = reduxSelector((store) => store.navbar.navbarPosition);
  const navItems = [
    {
      id: "navItem-home",
      to: "/",
      label: "home",
      Icon: <HomeIcon size={35} />,
    },
    {
      id: "navItem-calculator",
      to: "/calculator",
      label: "Calculator",
      Icon: <CalculatorIcon size={35} />,
    },
    {
      id: "navItem-search",
      to: "/search",
      label: "Search",
      Icon: <SearchIcon size={35} />,
    },
    {
      id: "navItem-mealPlan",
      to: "/mealplan",
      label: "Plan",
      Icon: <PlanMealIcon size={35} />,
    },
  ];
  return (
    <Container size='lg' className={classes.root}>
      <BottomNavigation showLabels className={classes.NavBar} value={position}>
        {navItems.map((each) => {
          return (
            <BottomNavigationAction
              component={Link}
              to={each.to}
              label={each.label}
              icon={each.Icon}
            />
          );
        })}
      </BottomNavigation>
    </Container>
  );
};

export default Narbar;
