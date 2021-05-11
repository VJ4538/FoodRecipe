import React from 'react'

export default function RecipeNutritions(props) {
    const  nutrients=props.foodData.nutrition.nutrients;
    //Essential Nutrients facts
    const calories=nutrients[0];
    const fat=nutrients[1];
    const satFat=nutrients[2];
    const carb=nutrients[3];
    const chole =nutrients[6];
    const sodium =nutrients[7];
    const protein=nutrients[8];


    function Row(props){
        return(
            <tr>
                <td className="row-title">{props.title}</td>
                <td>{props.amount} {props.unit}</td>
            </tr>
        )
    }
    return (
        <div className="recipe-nutrition">
            <h1 className="recipe-block-title">Nutrition Facts</h1>
            <table>
                {/* Calories */}
                <Row title={calories.title} amount={calories.amount} unit={calories.unit}/>
                {/* Fat */}
                <Row title={fat.title} amount={fat.amount} unit={fat.unit}/>
                {/*SatFat*/}
                <Row title={satFat.title} amount={satFat.amount} unit={satFat.unit}/>
                {/*Cholesterol*/}
                <Row title={chole.title} amount={chole.amount} unit={chole.unit}/>
                {/*Sodium*/}
                <Row title={sodium.title} amount={sodium.amount} unit={sodium.unit}/>
                {/*Carb*/}
                <Row title={carb.title} amount={carb.amount} unit={carb.unit}/>
                {/*Protein*/}
                <Row title={protein.title} amount={protein.amount} unit={protein.unit}/>
            </table>
        </div>
    )
}
