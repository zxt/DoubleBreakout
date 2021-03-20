import { trackKeys, trackMouse } from "./controls.js";

let settings = Object.create(null);

settings.p1 = {
    "controls": {
        "type": "keyboard",
        "input": trackKeys(["ArrowLeft", "ArrowRight", "a", "A", "d", "D"])
    },
    "paddleColor": "#0095DD",
    "ballColor": "#0095DD",
    "brickColor": "#0095DD"
}

settings.p2 = {
    "controls": {
        'type': 'mouse',
        'input': trackMouse('clientX')
    },
    "paddleColor": "#FF8800",
    "ballColor": "#FF8800",
    "brickColor": "#FF8800"
}

export { settings }