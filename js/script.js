"use strict";
window.onload = function () {

    const titleTable = createDomElement('div', 'tableTitle tableStyle', 'Users table.');
    const table = createDomElement('table', 'tableSum');
    const bt = createDomElement('button', 'bt');
    const btFraming = createDomElement('div', 'button1', 'New User');
    const btFilling = createDomElement('div', 'animation1');

    bt.appendChild(btFraming);
    btFraming.appendChild(btFilling);

    document.body.appendChild(titleTable);
    document.body.appendChild(bt);

    /************************************************************************************/

    function createDomElement(elem, className = "", text = "", eventType = "", eventFun) {
        const newElem = document.createElement(elem);
        if (className !== "") {
            newElem.className = className;
        }

        if (eventType !== "") {
            newElem.addEventListener(eventType, eventFun);
        }

        newElem.innerHTML = text;

        return newElem;
    }
}