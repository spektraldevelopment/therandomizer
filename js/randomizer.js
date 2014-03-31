//VARS
var
st, randTimer = false,
    loopTimer = false,
    isRand = false,
    randRange = {}, isLooped = false,
    loopRange = {}, copyRight = document.querySelector('#copyRight'),
    buttonArray, addressField = document.querySelector('#addressField'),
    playState, randNum,
    vidContainer = document.querySelector('#videoContainer'),
    randField = document.querySelector('#randField'),
    randStartField = document.querySelector('#randStartField'),
    randEndField = document.querySelector('#randEndField'),
    loopStartField = document.querySelector('#loopStartField'),
    loopEndField = document.querySelector('#loopEndField'),
    snapShotContainer = document.querySelector('#snapShotContainer'),
    currentTime;

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
    } else if (name === 'stopRandomize') {
        stopRandomizer();
    } else if (name === 'loop') {
        startLoop();
    } else if (name === 'stopLoop') {
        stopLoop();
    } else if (name === 'snapshot') {
        snapShot(snapShotContainer);
    }
}

function startRandomizer() {
    isRand = true;
    randRange['start'] = randStartField.value;
    randRange['end'] = randEndField.value;
    if (randTimer !== false) {
        clearInterval(randTimer);
    }
    randTimer = createTimer(randField.value, randomize);
}

function stopRandomizer() {
    isRand = false;
    clearInterval(randTimer);
    randTimer = false;
}

function randomize() {
    playState = st.getPlayerState();
    if (playState === 'PLAYING') {
        randNum = getRandomNum(randRange.start, randRange.end);
        st.seek(randNum);
    }
}

function startLoop() {
    isLooped = true;
    loopRange['start'] = loopStartField.value;
    loopRange['end'] = loopEndField.value;
    st.seek(loopRange.start);
    if (loopTimer !== false) {
        clearInterval(loopTimer);
    }
    loopTimer = createTimer(0.25, loop);
}

function loop() {
    currentTime = st.getTimeCurrent();
    playState = st.getPlayerState();
    if (playState == 'PLAYING') {
        if (currentTime >= loopRange.end) {
            st.seek(loopRange.start);
        }
    }
}

function stopLoop() {
    isLooped = false;
    clearInterval(loopTimer);
    loopTimer = false;
}

///////////////////////
////SNAP SHOT
//////////////////////
function snapShot (container, type) {
    type = type || "jpeg";
    vidContainer = document.querySelector('#videoContainer');
    //Maybe have this check if canvas exists, if not make it, etc.
    var
        canvas = document.createElement("canvas"),
        videoDimensions = getDimensions(vidContainer), ctx,
        dataURI, screenShotImg;

   console.dir(vidContainer);

    canvas.width = parseInt(videoDimensions.width, 10);
    canvas.height = parseInt(videoDimensions.height, 10);
    console.log("canvas.width: " + canvas.width + " canvas.height: " + canvas.height);
    ctx = canvas.getContext("2d");
    ctx.drawImage(st.getPlayerIFrame(), 0, 0, canvas.width, canvas.height);
    dataURI = canvas.toDataURL("image/" + type);

//    if (container !== undefined) {
//        screenShotImg = document.createElement("img");
//        //createSetAttribute(screenShotImg, "src", dataURI);
//        screenShotImg.setAttribute("src", dataURI);
//        container.appendChild(screenShotImg);
//    }
    return dataURI;
}


//UTILS

////////////////////
////CREATE TIMER
////////////////////
function createTimer(time, handler) {
    var convertedTime = time * 1000;
    return setInterval(handler, convertedTime);
}


////////////////////
////GET DIMENSIONS
////////////////////
function getDimensions(el) {
    var dimObj = {};
    dimObj['width'] = getStyle(el, 'width');
    dimObj['height'] = getStyle(el, 'height');
    console.log("getDimensions:" + JSON.stringify(dimObj));

    return dimObj;
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
    var isAnElement = false,
        type = possibleElement.nodeType;
    if (type === 1) {
        isAnElement = true;
    }
    return isAnElement;
}

////////////////////
////GET TYPE
////////////////////
function getType(obj) {
    var type;
    if (obj.nodeName !== undefined) {
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
function formatTime(time) {
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

/////////////////
////GET STYLE
//////////////////
function getStyle (element, styleProperty) {

    styleProperty = styleProperty || undefined;
    var style;
    if(styleProperty !== undefined) {
        try {
            style = element.currentStyle[styleProperty];
        } catch (err) {
            style = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProperty);
        }
    } else {
        console.log("getStyle: Could not get style.", "warn");
    }

    return style;
};

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

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}