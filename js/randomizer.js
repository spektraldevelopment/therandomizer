//VARS
var
    st, copyRight = document.getElementById('copyRight');

init();

function init() {
    st = new SpektralTube('theRandomizer');
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
