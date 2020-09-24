let divArr = [];
let lastElement;


function addDiv() {
    let newElement = document.createElement("div");
    newElement.id = "Idonotknow" + divArr.length;
    newElement.innerText = divArr.length + " ";
    newElement.className = "fuckYouBitch";

    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);
    let tmpId = newElement.id + "headLine";
    let HeadLine = '<h1 id =' + tmpId + '>' + noteObject.HeadLine + '</h1>';
    let tmpDate = '<h2 id=' + newElement.id + 'date' + '>' + getFormattedDate() + '</h2>';
    newElement.innerHTML = HeadLine + tmpDate;
    divArr.push(noteObject);
    newElement.addEventListener("click", () => downloadNote(noteObject));

}

function downloadNote(noteObject) {

    if (lastElement !== undefined) saveNote(lastElement);


    document.getElementById(noteObject.id).style["background"] = "yellow";
    document.getElementById("HeadLine").value = noteObject.HeadLine;
    document.getElementById("NoteBody").value = noteObject.NoteBody;
    document.getElementById("date").innerText = noteObject.Date;
    lastElement = noteObject;

}

function saveNote(noteObject) {

    document.getElementById(noteObject.id).style["background"] = "darkgray";
    noteObject.HeadLine = document.getElementById("HeadLine").value;
    noteObject.NoteBody = document.getElementById("NoteBody").value;
    noteObject.Date = getFormattedDate();
    let tmpString = noteObject.id + "headLine";
    document.getElementById(tmpString).innerText = noteObject.HeadLine;
    let tmpDate = noteObject.id + "date";
    document.getElementById(tmpDate).innerText = getFormattedDate();


}

function makeNoteObject(id) {
    return {
        id,
        HeadLine: " Untitled",
        NoteBody: " ",
        Date: getFormattedDate()
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





