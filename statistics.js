let options = {
    "element": "#granim-canvas",
    "direction": "left-right",
    "states": {
        "default-state":{
            gradients:[
                ["#f0f2f0", "#000c40"],
                ["#bdc3c7", "#2c3e50"],
            ],
            transitionSpeed: 2000,
            loop: true,
        }
    }
};
let granimInstance = new Granim(options);

//COVID-19 Stats
let submit = document.querySelector("#submit");
let preState = document.getElementById("options");

submit.onclick = function(event){
    event.preventDefault();
    let state = preState.options[preState.selectedIndex].text;
    const link = "https://api.covidactnow.org/v2/state/" + state + ".json?apiKey=aa03f65382a94a0daba1637b462dd6ee";
    const data = fetch(link).then(function getJSON(response){
    return response.json();
    }).then(function (myJson){
    //The recent update date
    let date = myJson.lastUpdatedDate;
    let append1 = document.querySelector("#date");
    let res1 = document.createElement("p");
    res1.innerHTML = date;
    append1.append(res1);

    //The number of cases
    let cases = myJson.actuals.cases;
    let append2 = document.querySelector("#cases");
    let res2 = document.createElement("p");
    res2.innerHTML = cases;
    append2.append(res2);

    //The number of deaths
    let deaths = myJson.actuals.deaths;
    let append3 = document.querySelector("#deaths");
    let res3 = document.createElement("p");
    res3.innerHTML = deaths;
    append3.append(res3);

    //New Cases
    let newCases = myJson.actuals.newCases;
    let append4 = document.querySelector("#cases_new");
    let res4 = document.createElement("p");
    res4.innerHTML = newCases;
    append4.append(res4);

    //New Deaths
    let newDeaths = myJson.actuals.newDeaths;
    let append5 = document.querySelector("#deaths_new");
    let res5 = document.createElement("p");
    res5.innerHTML = newDeaths;
    append5.append(res5);

    //Instantaneous mortality rate calculator
    let mortality_rate = (res5.innerHTML /res4.innerHTML)*100 +"%";
    let mortality = (res5.innerHTML /res4.innerHTML)*100;
    let append6 = document.querySelector("#rate_mortality");
    let res6 = document.createElement("p");
    res6.innerHTML = mortality_rate;
    append6.append(res6);

    //Mortality Rate Scale
    let risk;
    if(mortality < 0.25){
        risk = "Low";
    }
    else if(mortality >= 0.25 && mortality<0.75){
        risk = "Medium";
    }
    else if(mortality >= 0.75) {
        risk = "High";
    }
    let append7 = document.querySelector("#risk_level");
    let res7 = document.createElement("p");
    res7.innerHTML = risk;
    append7.append(res7);
    if(mortality < 0.25){
        res7.style.color = ("rgb(0,255,0)");
    }
    else if(mortality >= 0.25 && mortality<0.75){
        res7.style.color = ("rgb(0,0,255)");
    }
    else if(mortality >= 0.75) {
        res7.style.color = ("rgb(255,0,0)");
    }

    //Commentary from result
    let comment = document.createElement("p");
    if(mortality < 0.25){
        comment.innerHTML = "Even though the risk level is low, it is recommended to get a vaccine to minimize all risks";
    }
    else if(mortality >= 0.25 && mortality<0.75){
        comment.innerHTML = "Since there is medium risk, it is encouraged to get vaccinated in case of future increase in risk";
    }
    else if(mortality >= 0.75) {
        comment.innerHTML = "Since there is high risk in your state, it is strongly encouraged that you get the vaccine."
    }
    let append8 = document.querySelector("#commentary");
    append8.append(comment);

    //Administered Vaccines
    let administeredVaccines = myJson.actuals.vaccinesAdministered;
    let append9 = document.querySelector("#vaccines_administered");
    let res9 = document.createElement("p");
    res9.innerHTML = administeredVaccines;
    append9.append(res9);

    //Vaccines Distributed
    let vaccinesDistributed = myJson.actuals.vaccinesDistributed;
    let append10 = document.querySelector("#vaccines_distributed");
    let res10 = document.createElement("p");
    res10.innerHTML = vaccinesDistributed;
    append10.append(res10);

    //Get rid of submit button
    let box = document.querySelector("#selection_sub");
    box.removeChild(submit);
    });
}

//Typing Animation
var typed = new Typed('#typed_1',{
    stringsElement: '#typed',
    typeSpeed: 90,
    loop: true,
  });
