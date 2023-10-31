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

const move = e => {
    if (!elem) {
        return;
    }
    const pos = getCursorPos(e);
    const y = cursor.y + pos.y + window.scrollY;
    const x = cursor.x + pos.x + window.scrollX;
    elem.style.top = y + 'px';
    elem.style.left = x + 'px';
    elem.setAttribute("y", Math.floor(y)); // redundant
    elem.setAttribute("x", Math.floor(x)); // redundant
};

const unhook = _ => {
    elem.classList.remove('grabbed');
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchend', unhook);
    document.removeEventListener('mouseup', unhook);
};

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

window.addEventListener('load', _ => {
    const elements = document.querySelectorAll('div');
    for (const elem of elements) {
        elem.addEventListener('mousedown', hook);
        elem.style.top = Math.random()*window.innerHeight + 'px'; // redundant
        elem.style.left = Math.random()*window.innerWidth + 'px'; // redundant
        elem.setAttribute("y", Math.floor(parseInt(elem.style.top))); // redundant
        elem.setAttribute("x", Math.floor(parseInt(elem.style.left))); // redundant
    }
});
