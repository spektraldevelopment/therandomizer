//VARS
var
st, randTimer = false, isRand = false, randRange = {}, copyRight = document.getElementById('copyRight'),
controls = document.getElementById('controlsContainer'), buttonArray,
addressField = document.getElementById('addressField'), playState, randNum;

init();
setCopyright(copyRight);

//RANDOMIZER FUNCTIONALITY
function init() {
    st = new SpektralTube('theRandomizer', 'videoContainer');
    st.onReady(onReadyPlayer);
}

function onReadyPlayer(evt) {
    //st.volume(0);
    initControls();
    console.log("st onReadyPlayer")
}

function initControls() {
    buttonArray = document.querySelectorAll('input');
    for (var i = 0; i < buttonArray.length; i += 1) {
        attachEventListener(buttonArray[i], 'click', onButtonClick);
    }
}

function onButtonClick(evt) {
    var name = evt.target.name;
    console.log("Button Clicked: " + name);
    if (name === 'loadVideo') {
        st.loadVideo(addressField.value);
    } else if (name === 'mute') {
        st.toggleMute();
    } else if (name === 'randomize') {
        startRandomizer();
    }
}

function startRandomizer() {
    isRand = true;
    randRange['start'] = 0;
    randRange['end'] = 20;
    if (randTimer !== false) {
        clearInterval(randTimer);
    }
    randTimer = createTimer(0.1, randomize);
}

function stopRandomizer() {
    isRand = false;
    clearInterval(randTimer);
}

function randomize() {
    playState = st.getPlayerState()
    if (playState === 'PLAYING') {
        randNum = getRandomNum(randRange.start, randRange.end);
        st.seek(randNum);
    }
}

//UTILS

////////////////////
////CREATE TIMER
////////////////////
function createTimer (time, handler) {
    var convertedTime = time * 1000;
    return setInterval(handler, convertedTime);
}

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

//////////////////////
////FORMAT TIME
//////////////////////
function formatTime (time) {
    var
        formattedTime = {},
        hours = Math.floor(time / (60 * 60)),
        minDivisor = time % (60 * 60),
        minutes = Math.floor(minDivisor / 60),
        seconds = Math.floor(minDivisor % 60),
        secondsString = seconds.toString();

    if (seconds < 10) {
        secondsString = "0" + secondsString;
    }

    formattedTime["hours"] = hours.toString();
    formattedTime["minutes"] = minutes.toString();
    formattedTime["seconds"] = secondsString;

    formattedTime["hoursNum"] = hours;
    formattedTime["minutesNum"] = minutes;
    formattedTime["secondsNum"] = seconds;

    return formattedTime;
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

function getRandomNum (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}