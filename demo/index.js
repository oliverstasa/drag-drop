let elem;
let cursor = {
    x: 0,
    y: 0
};

const getCursorPos = e => {
    return {
        x: e.pageX || e.touches[0].pageX,
        y: e.pageY || e.touches[0].pageY
    }
};

// on mouseMove, sets x, y position of element
const move = e => {
    if (!elem) {
        return;
    }
    const pos = getCursorPos(e);
    const y = cursor.y + pos.y + window.scrollY;
    const x = cursor.x + pos.x + window.scrollX;
    elem.style.top = y + 'px';
    elem.style.left = x + 'px';
        // set x, y for position display --> redundant
        elem.setAttribute("y", Math.floor(y));
        elem.setAttribute("x", Math.floor(x));
};

// removes event listeners for movement and annuls elem var
const unhook = _ => {
    elem.classList.remove('grabbed');
    elem = undefined;
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchend', unhook);
    document.removeEventListener('mouseup', unhook);
};

// sets event listeners for movement along with init pos
const hook = e => {
    elem = e.target;
    elem.classList.add('grabbed');
    const rect = elem.getBoundingClientRect();
    const pos = getCursorPos(e);

    cursor.x = rect.left + rect.width/2 - pos.x;
    cursor.y = rect.top + rect.height/2 - pos.y;

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', unhook);
    document.addEventListener('touchend', unhook);
};

// on load --> set event listeners for all elements
window.addEventListener('load', _ => {
    const elements = document.querySelectorAll('div');
    for (const elem of elements) {
        elem.addEventListener('mousedown', hook);
        elem.addEventListener('touchstart', hook);
            // set random position --> redundant
            const y = Math.random()*window.innerHeight;
            const x = Math.random()*window.innerWidth;
            elem.style.top = y + 'px';
            elem.style.left = x + 'px';
            elem.setAttribute("y", y);
            elem.setAttribute("x", x);
    }
});
