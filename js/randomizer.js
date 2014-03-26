//VARS
var
st, st2, copyRight = document.getElementById('copyRight'),
controls = document.getElementById("controlsContainer"), buttonArray;

init();
setCopyright(copyRight);

//RANDOMIZER FUNCTIONALITY
function init() {
    st = new SpektralTube('theRandomizer', 'videoContainer');
    st.onReady(onReadyPlayer);
}

function onReadyPlayer(evt) {
    st.volume(0);
    initControls();
    console.log("st onReadyPlayer")
}

function initControls() {
    buttonArray = getChildren(controls, 'input');
    for (var i = 0; i < buttonArray.length; i += 1) {
        attachEventListener(buttonArray[i], 'click', onButtonClick);
    }
}

function onButtonClick(evt) {
    var name = evt.target.name;
    console.log("Button Clicked: " + name);
}

//UTILS

//////////////////
////ATTACH EVENT LISTENER
/////////////////
function attachEventListener(eventTarget, eventType, eventHandler) {
    if (eventTarget.addEventListener) {
        eventTarget.addEventListener(eventType, eventHandler, false);
    } else if (eventTarget.attachEvent) {
        eventType = "on" + eventType;
        eventTarget.attachEvent(eventType, eventHandler);
    } else {
        eventTarget["on" + eventType] = eventHandler;
    }
}

//////////////////
////DETACH EVENT LISTENER
/////////////////
function detachEventListener(eventTarget, eventType, eventHandler) {
    if (eventTarget.removeEventListener) {
        eventTarget.removeEventListener(eventType, eventHandler, false);
    } else if (eventTarget.detachEvent) {
        eventType = "on" + eventType;
        eventTarget.detachEvent(eventType, eventHandler);
    } else {
        eventTarget["on" + eventType] = null;
    }
}

//////////////////
////GET CHILDREN
/////////////////
function getChildren(parent, type) {
    type = type || "all"
    var
    children = parent.childNodes,
        childArr = [],
        i, isEl, nodeType;

    for (i = 0; i < children.length; i += 1) {
        isEl = isElement(children[i]);
        if (isEl === true) {
            nodeType = getType(children[i]);
            if (type === "all") {
                childArr.push(children[i]);
            } else {
                if (nodeType === type) {
                    childArr.push(children[i]);
                }
            }
        }
    }
    return childArr;
}

//////////////////
////IS ELEMENT
/////////////////
function isElement(possibleElement) {
    var isAnElement = false, type = possibleElement.nodeType;
    if(type === 1) {
        isAnElement = true;
    }
    return isAnElement;
}

////////////////////
////GET TYPE
////////////////////
function getType(obj) {
    var type;
    if(obj.nodeName !== undefined) {
        //element
        type = (obj.nodeName);
    } else {
        //everything else
        type = ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
    }
    type = type.toLowerCase();
    return type;
}

////////////////////
////SET COPYRIGHT
////////////////////
function setCopyright(container, startDate) {
    startDate = startDate || false;
    var
    copyString = "Copyright &#169; ",
        date = new Date(),
        currentYear = date.getFullYear();
    if (startDate !== false) {
        copyString += startDate + " - " + currentYear;
    } else {
        copyString += currentYear;
    }
    container.innerHTML = copyString;
}