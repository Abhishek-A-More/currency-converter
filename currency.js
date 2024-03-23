// currency converter API link
// URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_DdQafPk0jWcrMTdHsGcIG8nEvxQ7EA3cinDqMU1g&currencies=EUR%2CUSD%2CCAD";

// selector
const dropdowns = document.querySelectorAll(".main select");
const subBtn = document.querySelector(".sub")
const inpAmount = document.querySelector("#amount")
const fromVal = document.querySelector("#from")
const toVal = document.querySelector("#to")
const finalValue = document.querySelector("#converted")
// console.log(dropdowns)

// for(let code in countryList){
//     console.log(code, countryList[code])
// }

// getting currency code and country code by using for of and for in
for(let select of dropdowns){
    for(let code in countryList){
        let newOpt = document.createElement("option")
        newOpt.innerText = code;
        newOpt.value = code;
        
        // bydefault selected value
        if(select.name === "from" && code === "USD"){
            newOpt.selected = "selected"
        }else if(select.name === "to" && code === "INR"){
            newOpt.selected = "selected"
        }
        // appending option tag with value and text
        select.append(newOpt); 
    }

    // changes occurring event 
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    })
}

// to flag changes by using value
const changeFlag = (element)=>{
    let code = element.value;
    let conCode = countryList[code];
    let newSrc = `https://flagsapi.com/${conCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
}

// submit button event
subBtn.addEventListener("click", async (evnt)=>{
    evnt.preventDefault();         //to prevent behaviour
    let userValue = inpAmount.value;   //to get user input value
    if(userValue == "" || userValue <= 0){   // condition for empty or negative value
        userValue = 1;                    //default value
        inpAmount.value = "1"
    }

    // console.log(fromVal.value, toVal.value)

    // API url 
    const baseUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_DdQafPk0jWcrMTdHsGcIG8nEvxQ7EA3cinDqMU1g&currencies=${fromVal.value}%2C${toVal.value}`

    let response = await fetch(baseUrl);
    let data = await response.json();

    // console.log(data.data[toVal.value])
    


    let rate = data.data[toVal.value]  //currency value

    // console.log(rate)

    let convertedVal = userValue * rate;   //multiplication of user value and currency converting value 

    if(fromVal.value === toVal.value){
        finalValue.value = "trying to convert same currency"    //if u trying to converting in same currency
    }else{
        finalValue.value = `${userValue} ${fromVal.value} = ${convertedVal.toFixed(2)} ${toVal.value}`   // converted amount
    }
})



