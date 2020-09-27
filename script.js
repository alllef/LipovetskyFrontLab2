let divArr = [];
let lastElement;

let name = window.location.pathname;
if (localStorage.length > 5) localStorage.clear();
//localStorage.clear();
//console.log(window.location.href);
//console.log(window.location.pathname);
restoreNotes();

sortByDate();
document.getElementById("AddButton").addEventListener("click", addDiv);

function addDiv() {
    let newElement = document.createElement("div");


    newElement.innerHTML = document.getElementById("Idonotknow0").innerHTML;
    newElement.id = "Idonotknow" + (divArr.length + 1);
    newElement.className = document.getElementById("Idonotknow0").className;



    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);

    divArr.push(noteObject);

    newElement.addEventListener("click", () => downloadNote(noteObject));

    let tmpString = "#" + newElement.id + " input";
    document.querySelector(tmpString).addEventListener("click", () => deleteNote(noteObject));
    localStorage.setItem(newElement.id, JSON.stringify(noteObject));
    sortByDate();

}

function restoreNotes() {
    localStorage.removeItem("language");

    for (let i = 0; i < localStorage.length; i++) {

        let restoreObject = localStorage.getItem(localStorage.key(i));
        divArr.push(JSON.parse(restoreObject));

    }
}

function restoreNote(noteObject) {

    let newElement = document.createElement("div");


    newElement.innerHTML = document.getElementById("Idonotknow0").innerHTML;
    newElement.id = noteObject.id;
    newElement.className = document.getElementById("Idonotknow0").className;

    document.getElementById("NoteList").appendChild(newElement);
    saveInformation(noteObject);

    newElement.addEventListener("click", () => downloadNote(noteObject));

    let tmpString = "#" + newElement.id + " input";
    document.querySelector(tmpString).addEventListener("click", () => deleteNote(noteObject));




}

function downloadNote(noteObject) {

    if (lastElement !== undefined && lastElement !== null) saveNote(lastElement);
    history.pushState({param: 'Value'}, '', name+"/"+noteObject.id);
    console.log(window.location.pathname);
    console.log("before changing");

    document.getElementById(noteObject.id).style["background"] = "yellow";
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
        HeadLine: " Untitled",
        NoteBody: " ",
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

    myNode.innerHTML = "<INPUT type = \"button\" id=\"AddButton\" VALUE=\"добавить заметку\">" +
        "<div id=\"Idonotknow0\" class=\"fuckYouBitch\"><INPUT type = \"button\" class= \"deleteButton\" VALUE=\"X\"> <h1>Untitled </h1> <h2> </h2> <h3> </h3> </div>";
    document.getElementById("AddButton").addEventListener("click", addDiv);

    sleep(10);

    divArr.sort((prev, next) => (next.valueDate - prev.valueDate));
    document.getElementById("Idonotknow0").addEventListener("click", () => downloadNote(divArr[0]));

    for (let i = 0; i < divArr.length; i++) {
        restoreNote(divArr[i]);
        sleep(1);

    }

}

function saveInformation(noteObject) {

    let tmpString = "#" + noteObject.id;

    document.querySelector(tmpString+" h1").innerText = noteObject.HeadLine;
    document.querySelector(tmpString+" h2").innerText = noteObject.stringDate;
    document.querySelector(tmpString+" h3").innerText = noteObject.NoteBody.slice(0, 5);

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
    divArr.splice(divArr.indexOf(noteObject), 1);
    sortByDate();
}