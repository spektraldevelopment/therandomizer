//VARS
var
    st, st2, copyRight = document.getElementById('copyRight');

init();

function init() {
    st = new SpektralTube('theRandomizer', 'videoContainer');
    st.onReady(onReadyPlayer);
}

function onReadyPlayer(evt) {
    st.volume(0);
    console.log("st onReadyPlayer")
}

setCopyright(copyRight);

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
