let shortcutNoteArr = [];
let lastElement;
let idCounter = 0;


restoreNotes();

sortByDate();

document.getElementById("AddButton").addEventListener("click", addDiv);
window.addEventListener('unload', () => saveNote(lastElement));

downloadById();


function addDiv() {
    let newElement = document.createElement("div");


    newElement.innerHTML = document.getElementById("Idonotknow0").innerHTML;
    newElement.id = "Idonotknow" + (++idCounter);
    newElement.className = document.getElementById("Idonotknow0").className;


    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);

    shortcutNoteArr.push(noteObject);

    document.querySelector("#" + newElement.id + " h1").addEventListener("click", () => downloadNote(noteObject));

    let tmpString = "#" + newElement.id + " input";
    document.querySelector(tmpString).addEventListener("click", () => deleteNote(noteObject));

    localStorage.setItem(newElement.id, JSON.stringify(noteObject));
    localStorage.setItem("number", idCounter);
    sortByDate();

}

function restoreNotes() {
    localStorage.removeItem("language");
    idCounter = localStorage.getItem("number");
    localStorage.removeItem("number");
    for (let i = 0; i < localStorage.length; i++) {

        let restoreObject = localStorage.getItem(localStorage.key(i));
        shortcutNoteArr.push(JSON.parse(restoreObject));

    }
}

function restoreNote(noteObject) {

    let newElement = document.createElement("div");


    newElement.innerHTML = document.getElementById("Idonotknow0").innerHTML;
    newElement.id = noteObject.id;
    newElement.className = document.getElementById("Idonotknow0").className;

    document.getElementById("NoteList").appendChild(newElement);
    saveInformation(noteObject);

    document.querySelector("#" + newElement.id + " h1").addEventListener("click", () => downloadNote(noteObject));

    let tmpString = "#" + newElement.id + " input";
    document.querySelector(tmpString).addEventListener("click", () => deleteNote(noteObject));


}

function downloadNote(noteObject) {

    if (lastElement !== undefined && lastElement !== null) saveNote(lastElement);
    location.hash = noteObject.id;


    document.getElementById(noteObject.id).style["background"] = "rgba(255,255,0,0.6)";
    document.getElementById("HeadLine").value = noteObject.HeadLine;
    document.getElementById("NoteBody").value = noteObject.NoteBody;
    document.getElementById("date").innerText = noteObject.stringDate;

    lastElement = noteObject;

}

function saveNote(noteObject) {

    let tmpDate = new Date();


    document.getElementById(noteObject.id).style["background"] = "darkgray";

    noteObject.HeadLine = document.getElementById("HeadLine").value;
    noteObject.NoteBody = document.getElementById("NoteBody").value;
    noteObject.stringDate = getFormattedDate(tmpDate);
    noteObject.valueDate = tmpDate.getTime();

    saveInformation(noteObject);

    localStorage.setItem(noteObject.id, JSON.stringify(noteObject));
    sortByDate();


}

function makeNoteObject(id) {
    let date = new Date();

    return {
        id,
        HeadLine: "Untitled",
        NoteBody: "",
        stringDate: getFormattedDate(date),
        valueDate: date.getTime()
    }

}

function getFormattedDate(date) {

    let options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }
    return date.toLocaleString("ru", options);
}


function sortByDate() {

    const myNode = document.getElementById("NoteList");


    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    myNode.innerHTML = "<INPUT type = \"button\" id=\"AddButton\" VALUE=\"Add note\">" +
        "<div id=\"Idonotknow0\" class=\"ShortcutNote\"><INPUT type = \"button\" class= \"deleteButton\" VALUE=\"\"> <h1>Untitled </h1> <h2> </h2> <h3> </h3> </div>";
    document.getElementById("AddButton").addEventListener("click", addDiv);

    sleep(10);

    shortcutNoteArr.sort((prev, next) => (next.valueDate - prev.valueDate));


    for (let i = 0; i < shortcutNoteArr.length; i++) {
        restoreNote(shortcutNoteArr[i]);
        sleep(1);
    }

}

function saveInformation(noteObject) {

    let tmpString = "#" + noteObject.id;

    document.querySelector(tmpString + " h1").innerText = noteObject.HeadLine.slice(0, 10);
    document.querySelector(tmpString + " h2").innerText = noteObject.stringDate;
    document.querySelector(tmpString + " h3").innerText = noteObject.NoteBody.slice(0, 10);

}


function sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function deleteNote(noteObject) {
    lastElement = null;
    document.getElementById(noteObject.id).parentNode.removeChild(document.getElementById(noteObject.id));
    localStorage.removeItem(noteObject.id);
    shortcutNoteArr.splice(shortcutNoteArr.indexOf(noteObject), 1);
    sortByDate();
}

function downloadById() {
    let chosenNoteObject;
    if (location.hash.length > 0) chosenNoteObject = shortcutNoteArr.find(item => item.id === location.hash.slice(1));
    if (chosenNoteObject !== undefined) downloadNote(chosenNoteObject);

}