
export default function calculateCalories (setResult,unit){
    let height=parseFloat(document.querySelector("#Height").value);
    let weight=parseFloat(document.querySelector("#Weight").value);
    
    if(unit==="Metric"){
        height=height/2.54;
        weight=weight*2.205;
    }

    // console.log(height);
    // console.log(weight);

    const age= parseFloat(document.querySelector("#Age").value);
    const gender=document.querySelector("#gender").value;
    const activity=parseFloat(document.querySelector("#activity-factor").value);

    if(gender ==="Male"){
        let calories=(66+(6.3*weight)+(12.9*height)-(6.8*age))*activity;
        setResult(parseInt(calories));
    }else if(gender ==="Female"){
        let calories=(655+(4.3*weight)+(4.7*height)-(4.7*age))*activity;
        setResult(parseInt(calories));
    }
}