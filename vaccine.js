let options = {
    "element": "#granim-canvas",
    "direction": "left-right",
    "states": {
        "default-state":{
            gradients:[
                ["#BA8B02", "#181818"],
                ["#666600", "#999966"],
                ["#e9d362", "#333333"],
            ],
            transitionSpeed: 2000,
            loop: true,
        }
    }
};
let granimInstance = new Granim(options);