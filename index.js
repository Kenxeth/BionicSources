//  background stuff 
let options = {
    "element": "#granim-canvas",
    "direction": "left-right",
    "states": {
        "default-state":{
            gradients:[
                ["#ffffff", "#93291e"],
                ["#333333", "#dd1818"],
                ["#EB5757", "#000000"],
            ],
            transitionSpeed: 2000,
            loop: true,
        }
    }
};
let granimInstance = new Granim(options);
