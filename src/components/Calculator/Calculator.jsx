import React,{useState} from 'react';
import Input from './CaluInput';
import SelectOptions from "./SelectOptions";
import calculateCalories from "../js/calculateBMR";
import Instruction from "../Instruction";

export default function Calculator() {
    const [CalResult,setCalResult]=useState(0); 
    const [UnitType, setUnitType]=useState("US"); // US and imperial unit
    return (
        <div className="calculator-container">
            <div className="calculator">
            <Instruction notes="Calculate Calories you need per day!"/>

            <div className="unit-container">
            <button className="button-default Unit" onClick={()=>{
               setUnitType("US");
            }}>US Units</button>
            <button className="button-default" onClick={()=>{
               setUnitType("Metric");
            }}>Metric Units</button>
              <p> Current Unit: {UnitType}  Unit</p>
            </div>

             <SelectOptions 
                id="gender" 
                title="Gender: "
                options=
                {[
                  {keys:"gender-1",value:"Male",context:"Male"},
                  {keys:"gender-2",value:"Female",context:"Female"}
                ]}
              />

            {UnitType==="US"? 
            <Input type="number" title="Height" name="Height:/ # of Inches"  placeholder="Example: 80"/>:
            <Input type="number" title="Height" name="Height:/ # CM" placeholder="Example: 170"/>}

            {UnitType==="US"? 
            <Input type="number" title="Weight" name="Weight / # of Pounds"  placeholder="Example: 150 "/>:
            <Input type="number" title="Weight" name="Height:/ # kg"placeholder="Example: 60"/>}

            <Input type="number" title="Age" name="Age" placeholder="Example: 20"/>  
            <SelectOptions 
            id="activity-factor"
            title="Activity-Factor: "
            options=
                {[
                  {keys:"activity-1",value:1.2,context:"Little or no exercise"},
                  {keys:"activity-2",value:1.375,context:"Sports 1-3 days/week"},
                  {keys:"activity-3",value:1.55,context:"Sports 3-5 days/week"},
                  {keys:"activity-4",value:1.725,context:"Sports 6-7 days a week"},
                  {keys:"activity-5",value:1.9,context:"Sports & physical job or 2x training"}
                ]}
              />
            <button class="button-default cal-button" onClick={()=>{
                    calculateCalories(setCalResult,UnitType);
            }}>Calculate Now</button>
                        {isNaN(CalResult)?<p className="result">Please fill in the information and Click Calculate.</p>:<p className="result">You need <span className="resultNumber">{CalResult}</span> Calories to maintain your weight.</p>}
        
            </div>
        </div>
    )
}
