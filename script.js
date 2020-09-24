let divArr = [];
let lastElement;


if (localStorage.length > 5) localStorage.clear();
restoreNotes();

function addDiv() {
    let newElement = document.createElement("div");
    newElement.id = "Idonotknow" + divArr.length;
    newElement.innerText = divArr.length + " ";
    newElement.className = "fuckYouBitch";

    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);
    let tmpId = newElement.id + "headline";
    let HeadLine = '<h1 id =' + tmpId + '>' + noteObject.HeadLine + '</h1>';
    let tmpDate = '<h2 id=' + newElement.id + 'date' + '>' + getFormattedDate() + '</h2>';
    newElement.innerHTML = HeadLine + tmpDate;
    divArr.push(noteObject);
    newElement.addEventListener("click", () => downloadNote(noteObject));

    let tmp = JSON.stringify(noteObject);
    localStorage.setItem(newElement.id, tmp);
}

function restoreNotes() {
    localStorage.removeItem("language");
    /* lastElement =JSON.parse(localStorage.getItem("lastElement")) ;
     console.log(lastElement);
     console.log("lastElement after restoring");*/
    for (let i = 0; i < localStorage.length; i++) {
        //if (localStorage.key(i)===lastElement) continue;
        let restoreObject = localStorage.getItem(localStorage.key(i));
        restoreObject = JSON.parse(restoreObject);
        console.log(localStorage.key(i));
        console.log(restoreObject);
        console.log("When restoring");
        restoreNote(restoreObject);
    }
}

function restoreNote(restoreObject) {
    let newElement = document.createElement("div");
    newElement.id = restoreObject.id;
    newElement.className = "fuckYouBitch";

    document.getElementById("NoteList").appendChild(newElement);
    let tmpId = newElement.id;
    let HeadLine = '<h1 id =' + tmpId +'headline' +'>' + restoreObject.HeadLine + '</h1>';
    let tmpDate = '<h2 id=' + newElement.id + 'date' + '>' + restoreObject.Date + '</h2>';
    newElement.innerHTML = HeadLine + tmpDate;
    divArr.push(restoreObject);
    newElement.addEventListener("click", () => downloadNote(restoreObject));

}

function downloadNote(noteObject) {
    console.log(noteObject);
    console.log("onDownloading");
    if (lastElement !== undefined && lastElement!==null) saveNote(lastElement);


    document.getElementById(noteObject.id).style["background"] = "yellow";
    document.getElementById("HeadLine").value = noteObject.HeadLine;
    document.getElementById("NoteBody").value = noteObject.NoteBody;
    document.getElementById("date").innerText = noteObject.Date;
    lastElement = noteObject;
    //localStorage.setItem("lastElement",JSON.stringify(lastElement));
}

function saveNote(noteObject) {
    console.log(noteObject);
    console.log("onSaving");
    document.getElementById(noteObject.id).style["background"] = "darkgray";
    noteObject.HeadLine = document.getElementById("HeadLine").value;
    noteObject.NoteBody = document.getElementById("NoteBody").value;
    noteObject.Date = getFormattedDate();
    let tmpString = noteObject.id + "headline";

    document.getElementById(tmpString).innerText = noteObject.HeadLine;
    let tmpDate = noteObject.id + "date";
    document.getElementById(tmpDate).innerText = getFormattedDate();
    let tmp = JSON.stringify(noteObject);
    localStorage.setItem(noteObject.id, tmp);

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





