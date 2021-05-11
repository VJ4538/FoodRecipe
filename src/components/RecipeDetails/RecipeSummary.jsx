import React from 'react';

export default function RecipeSummary(props) {
    const summary=props.foodData.summary.replace( /(<([^>]+)>)/ig, '');
    return (
        <div className="recipe-summary">
        <h1 className="recipe-block-title food-title">Summary</h1>
            {summary}
        </div>
    )
}
