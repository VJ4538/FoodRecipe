import React,{useState, useEffect}from 'react'
import SearchOptions from "./SearchOptions";
import EachRecipe from "../EachRecipe";
import Calculator from "../Calculator/Calculator";
import FilterSection from './FilterSection';
import axios from 'axios';
import NavBar from "../NavBar";


export default function Search() {
    const [foods,setFoods]=useState([]);
    //store the parmas of complex search
    const [parma, setParma]=useState({
        Calories:{minmax:'none',amount:''},
        Protein:{minmax:'none',amount:''},
        Fat:{minmax:'none',amount:''},
        Carbs:{minmax:'none',amount:''}
        });

    let url=`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12`;
    let offsetNumber = Math.floor(Math.random() * (1000 - 200));
    //Complex search detch data
    function fetchData(complexParma){
        // console.log(url+complexParma);
        axios.get(url+complexParma)
        .then(response=>{
            const {results}=response.data;
            if(results.length===0){
                alert(`Not matched recipe found. Please try again.`);
            }else{
                setFoods(results);
            }
        })
        .catch((err)=>{
            let data =err.response.data;
            alert(`Status:${data.status}  Code:${data.code}   Message:${data.message}`)
        });
    }

    //gnerate the complexParma and call fetch data
    function handleSubmit(){
        let extraParma =`&offset=${offsetNumber}`; 
        for (const property in parma) {
            if(parma[property].minmax!=="none"){
                // console.log(`${property}: ${parma[property].minmax} :${parma[property].amount}`);
                // console.log(parma[property].minmax!=="");
                extraParma=extraParma+`&${parma[property].minmax}${property}=${parma[property].amount}`
                //gererate the parma and add 
            }
         }

        //  console.log(extraParma);
         fetchData(extraParma);
    }

    //Handle select change
    function handleType(e){
        let {name, value}=e.target;
        let minMax=value.slice(0,3); 
        if(value==="none"){
            minMax=value;
        }
        setParma((previous)=>{
            let prevAmount=previous[name].amount;
            return {...previous,[name]:{amount:prevAmount,minmax:minMax}}
        })
    }
    //Handle value change
    function handleChange(e){
        let {name,value}=e.target;
        setParma((previous)=>{
            let prevMinMax=previous[name].minmax;
            return {...previous,[name]:{amount:value,minmax:prevMinMax}}
        })
    }
    //get local storage
    useEffect(()=>{
        //Storage 
        const parsedFoods=localStorage.getItem("foods")
        setFoods(JSON.parse(parsedFoods));

    },[])

    //save the recipes everytime it changes
    useEffect(()=>{
        localStorage.setItem('foods', JSON.stringify(foods));
    },[foods])


    return (
        <div className="content-container">
                <NavBar home="t" random="t"/>
        <div className="search-container">
        <div className="tools">
            <Calculator />
            <div className="complex-Search">
            <p className="Instruction">Search By Nutrients:</p>
            <SearchOptions handleType={handleType} handle={handleChange} type="Calories" name="Calories"/>
            <SearchOptions handleType={handleType} handle={handleChange} type="Protein" name="Protein"/>
            <SearchOptions handleType={handleType} handle={handleChange} type="Fat" name="Fat"/>
            <SearchOptions handleType={handleType} handle={handleChange} type="Carbs" name="Carbs"/>
            <FilterSection data={parma}/>
            <button type="submit" className="button-default" onClick={handleSubmit} >Get Recipe</button>
            </div>
        </div>

        {/* each recipe wait for user to submit a request then display*/}
         {foods&& <div className="food-container">
            {foods.map((eachFood)=>{
                return(<EachRecipe key={eachFood.id} recipe={eachFood} />)
            })}</div>
        }

        </div>
        </div>

    )
}
//Spoonacular API