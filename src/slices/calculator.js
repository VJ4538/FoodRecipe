import { createSlice } from "@reduxjs/toolkit";

const initialState={
    BmiResult:null,
    CalorieResult:{
        maintain:null,
        goal:null,
    },
    type:'BMI',
}

const slice =createSlice({
    name:'calculator',
    initialState,
    reducers:{
        setBmiResult(oldState, action) {
            oldState.BmiResult = action.payload;
        },
        setCalorieResult(oldState, action) {
            const {maintain, goal} =action.payload
            oldState.CalorieResult = {
                maintain:maintain,
                goal:goal,
            };
        },
        resetResults(oldState,action){
            oldState.BmiResult= null
            oldState.CalorieResult={maintain:null, goal:null,}
        },
    }
})



export const reducer =slice.reducer

export const setCalculatorType = () => (dispatch) => {

}

export const calculateBMIResult = (data) => (dispatch) => {
    const {weight, heightInch,heightFeet} = data
    //Calculate BMI logic
    const height =heightFeet*12 +heightInch;
    const result = ((weight/(height*height))*703).toFixed(2)
    dispatch(slice.actions.setBmiResult(+result));
}

export const calculateCalorieResult = (data) => (dispatch) => {
    const {
        gender, 
        weight, 
        age, 
        heightInch, 
        heightFeet, 
        activity,
        goal,
        goalAmount,
        duration,
        durationTime,
    } = data
    //Calculate BMR logic
    const result={
        maintain:null,
        goal:null,
    }
    const height =heightFeet*12 + heightInch

    if(gender==='male'){
        // 66 + (6.23 × weight in pounds) + (12.7 × height in inches) − (6.8 × age in years)
        const maintainResult = ((66 + (6.23*weight) + (12.7*height) -(6.8*age))*+activity).toFixed(0)
        result.maintain=maintainResult
        const time =+duration * durationTime
 
        const calories =(goalAmount*3500)/time 

        if(goal==='gain'){
            result.goal=+maintainResult+calories 
        }else{
            result.goal=+maintainResult-calories 
        }

        // console.log('result',result)
        dispatch(slice.actions.setCalorieResult(result))
    }else{
        //655 + (4.35 × weight in pounds) + (4.7 × height in inches) − (4.7 × age in years)
        const maintainResult = ((655 + (4.35*weight) + (4.7*height) -(4.7*age))*+activity).toFixed(0)
        result.maintain=maintainResult
        const time =+duration * durationTime
 
        const calories =(goalAmount*3500)/time 

        if(goal==='gain'){
            result.goal=+maintainResult+calories 
        }else{
            result.goal=+maintainResult-calories 
        }

        // console.log('result',result)
        dispatch(slice.actions.setCalorieResult(result))


    }
}

export const resetResults = () => (dispatch) => {
    dispatch(slice.actions.resetResults())
}




export default slice