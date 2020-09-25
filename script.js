let divArr = [];
let lastElement;


if (localStorage.length > 5) localStorage.clear();
localStorage.clear();

restoreNotes();

sortByDate();

//document.getElementById("Idonotknow0").addEventListener("click", () => downloadNote(makeNoteObject(this.id)));
function addDiv() {
    let newElement = document.createElement("div");


    newElement.innerHTML = document.getElementById("Idonotknow0").innerHTML;
    newElement.id = "Idonotknow" + (divArr.length + 1);
    newElement.className = document.getElementById("Idonotknow0").className;



    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);

    divArr.push(noteObject);
    newElement.addEventListener("click", () => downloadNote(noteObject));


    localStorage.setItem(newElement.id, JSON.stringify(noteObject));
    sortByDate();

}

function restoreNotes() {
    localStorage.removeItem("language");

    for (let i = 0; i < localStorage.length; i++) {

        let restoreObject = localStorage.getItem(localStorage.key(i));
        restoreObject = JSON.parse(restoreObject);
        divArr.push(restoreObject);

    }
}

function restoreNote(restoreObject) {

    let newElement = document.createElement("div");
    let tmpString = "#" + restoreObject.id + " h1";

    newElement.innerHTML = document.getElementById("Idonotknow0").innerHTML;
    newElement.id = restoreObject.id;
    newElement.className = document.getElementById("Idonotknow0").className;

    newElement.querySelector(tmpString).innerText = restoreObject.HeadLine;
    tmpString = "#" + restoreObject.id + " h2";
    newElement.querySelector(tmpString).innerText = restoreObject.stringDate;
    newElement.addEventListener("click", () => downloadNote(restoreObject));
    return newElement;
}

function downloadNote(noteObject) {

    if (lastElement !== undefined && lastElement !== null) saveNote(lastElement);


    document.getElementById(noteObject.id).style["background"] = "yellow";
    document.getElementById("HeadLine").value = noteObject.HeadLine;
    document.getElementById("NoteBody").value = noteObject.NoteBody;
    document.getElementById("date").innerText = noteObject.stringDate;

    lastElement = noteObject;

}

function saveNote(noteObject) {

    let tmpDate = new Date();
    let tmpString = "#" + noteObject.id + " h1";

    document.getElementById(noteObject.id).style["background"] = "darkgray";

    noteObject.HeadLine = document.getElementById("HeadLine").value;
    noteObject.NoteBody = document.getElementById("NoteBody").value;
    noteObject.stringDate = getFormattedDate(tmpDate);
    noteObject.valueDate = tmpDate.getTime();

    document.querySelector(tmpString).innerText = noteObject.HeadLine;
    tmpString = "#" + noteObject.id + " h2";
    document.querySelector(tmpString).innerText = noteObject.stringDate;


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

document.getElementById("AddButton").addEventListener("click", addDiv);


function sortByDate() {

    const myNode = document.getElementById("NoteList");

    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }

    myNode.innerHTML = "<INPUT type = \"button\" id=\"AddButton\" VALUE=\"добавить заметку\">" +
        "<div id=\"Idonotknow0\" class=\"fuckYouBitch\"> <h1>Untitled </h1> <h2> </h2> </div>";
    document.getElementById("AddButton").addEventListener("click", addDiv);

    sleep(10);

    divArr.sort((prev, next) => (next.valueDate - prev.valueDate));
    document.getElementById("Idonotknow0").addEventListener("click", () => downloadNote(divArr[0]));

    for (let i = 0; i < divArr.length; i++) {
        document.getElementById("NoteList").appendChild(restoreNote(divArr[i]));
    }

}


function sleep(milliseconds) {
    let start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}