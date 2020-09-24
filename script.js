let divArr = [];
let lastElement;


function addDiv() {
    let newElement = document.createElement("div");
    newElement.id = "Idonotknow" + divArr.length;
    newElement.innerText = divArr.length + " " + getFormattedDate();
    newElement.className = "fuckYouBitch";

    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);
    //let tmpId = newElement.id + "headLine";
    //let tmpString = '<h1 id =' + tmpId + '>' + noteObject.HeadLine + '</h1>';
    newElement.innerText += noteObject.HeadLine;
    divArr.push(noteObject);
    newElement.addEventListener("click", () => downloadNote(noteObject));

}

function downloadNote(noteObject) {

    if (lastElement !== undefined) saveNote(lastElement);
    document.getElementById(noteObject.id).focus();
    document.getElementById(noteObject.id).style["background"] = "yellow";
    document.getElementById("HeadLine").value = noteObject.HeadLine;
    document.getElementById("NoteBody").value = noteObject.NoteBody;
    lastElement = noteObject;

}

function saveNote(noteObject) {

    document.getElementById(noteObject.id).style["background"] = "darkgray";
    noteObject.HeadLine = document.getElementById("HeadLine").value;
    noteObject.NoteBody = document.getElementById("NoteBody").value;
    //let tmpString = noteObject.id + "headLine";
    //document.getElementById(tmpString).innerText = noteObject.HeadLine;


    document.getElementById("date").innerText = getFormattedDate();
    document.getElementById(noteObject.id).innerText = getFormattedDate()+noteObject.HeadLine;


}

function makeNoteObject(id) {
    return {
        id,
        HeadLine: " Untitled",
        NoteBody: " "
    }

}

function getFormattedDate() {
    return new Intl.DateTimeFormat("ru", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).format(new Date());
}

document.getElementById("AddButton").addEventListener("click", addDiv);





