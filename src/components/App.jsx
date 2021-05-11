import React from "react";
import Search from "./Search/Search";
import Home from "./Home/Home";
import RandomFoodRecipe from "./GenerateRandom/RandomFoodRecipe";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RecipeItem from "./RecipeDetails/RecipeDetailPage";


//dark theme
function App() {


  return(
    <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/random" exact component={RandomFoodRecipe}/>
          <Route 
            path="/search/:id" exact 
            render={({match}) => (
              <RecipeItem id={match.params.id}/>
             )} 
          />
        </Switch>
     </Router>

  );
}

export default App;