function trackKeys(keys) {
    let pressed = Object.create(null);

    function track(event) {
        if (keys.includes(event.key)) {
            pressed[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown", track);
    window.addEventListener("keyup", track);
    return pressed;
}

function trackMouse(prop) {
    let mouse = Object.create(null);

    function track(event) {
        mouse[prop] = event.clientX;
    }

    window.addEventListener("mousemove", track);
    return mouse;
}

export { trackKeys, trackMouse }