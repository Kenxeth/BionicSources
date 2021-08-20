//Linear Gradient Styling
let options = {
    "element": "#granim-canvas",
    "direction": "left-right",
    "states": {
        "default-state":{
            gradients:[
                ["#ffe259", "#ffa751"],
                ["#ee9ca7", "#ffdde1"],
            ],
            transitionSpeed: 3000,
            loop: true,
        }
    }
};

let granimInstance = new Granim(options);

//Object Reference
let database = firebase.database().ref();
let allMessages = document.querySelector(".body");
let messageElement = document.querySelector("#text");
let button = document.querySelector("#send");

button.onclick = function updateDB(event){
    console.log("hi");
    event.preventDefault();

    let message = messageElement.value;
    messageElement.value = "";

    //create message
    let userMessage = document.createElement("p");
    userMessage.innerHTML = message;

    let value = {
        USER: message,
    }
    database.push(value);
}

database.on("child_added", function(childData){
    let messageData = childData.val();
    
    if(messageData.USER != undefined){
    let userMessage = document.createElement("p");
    userMessage.id = "user";
    userMessage.innerHTML = "User: "+messageData.USER;
    allMessages.append(userMessage);
    }

    if(messageData.RESPONDENT != undefined){
        let respondentMessage = document.createElement("p");
        respondentMessage.id = "respondent";
        respondentMessage.innerHTML = "Representative: "+messageData.RESPONDENT;
        allMessages.append(respondentMessage);
    }
    
});

//Typing Animation
    var typed = new Typed('#typed_2',{
        stringsElement: '#second',
        typeSpeed: 50,
        backSpeed: 70,
        loop: true,
      });