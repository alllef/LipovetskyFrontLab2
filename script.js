let divArr = [];
let lastElement;


//if (localStorage.length > 5) localStorage.clear();
localStorage.clear();

restoreNotes();

sortByDate();


function addDiv() {
    let newElement = document.createElement("div");
    newElement.id = "Idonotknow" + divArr.length;
    newElement.innerText = divArr.length + " ";
    newElement.className = "fuckYouBitch";

    document.getElementById("NoteList").appendChild(newElement);
    let noteObject = makeNoteObject(newElement.id);
    let tmpId = newElement.id + "headline";
    let HeadLine = '<h1 id =' + tmpId + '>' + noteObject.HeadLine + '</h1>';
    let tmpDate = '<h2 id=' + newElement.id + 'date' + '>' + noteObject.stringDate + '</h2>';
    newElement.innerHTML = HeadLine + tmpDate;
    divArr.push(noteObject);
    newElement.addEventListener("click", () => downloadNote(noteObject));

    let tmp = JSON.stringify(noteObject);
    localStorage.setItem(newElement.id, tmp);

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
    newElement.id = restoreObject.id;
    newElement.className = "fuckYouBitch";


    let tmpId = newElement.id;
    let HeadLine = '<h1 id =' + tmpId + 'headline' + '>' + restoreObject.HeadLine + '</h1>';
    let tmpDate = '<h2 id=' + newElement.id + 'date' + '>' + restoreObject.stringDate + '</h2>';
    newElement.innerHTML = HeadLine + tmpDate;
    newElement.addEventListener("click", () => downloadNote(restoreObject));
    return newElement;
}

function downloadNote(noteObject) {
    console.log(noteObject);
    console.log("onDownloading");
    if (lastElement !== undefined && lastElement !== null) saveNote(lastElement);


    document.getElementById(noteObject.id).style["background"] = "yellow";
    document.getElementById("HeadLine").value = noteObject.HeadLine;
    document.getElementById("NoteBody").value = noteObject.NoteBody;
    document.getElementById("date").innerText = noteObject.stringDate;
    lastElement = noteObject;
    //localStorage.setItem("lastElement",JSON.stringify(lastElement));
}

function saveNote(noteObject) {
    console.log(noteObject);
    console.log("onSaving");
    document.getElementById(noteObject.id).style["background"] = "darkgray";
    noteObject.HeadLine = document.getElementById("HeadLine").value;
    noteObject.NoteBody = document.getElementById("NoteBody").value;
    let tmpDate = new Date();
    noteObject.stringDate = getFormattedDate(tmpDate);
    noteObject.valueDate = tmpDate.getTime();
    let tmpString = noteObject.id + "headline";

    document.getElementById(tmpString).innerText = noteObject.HeadLine;
    let tmpDateId = noteObject.id + "date";
    document.getElementById(tmpDateId).innerText = noteObject.stringDate;
    console.log(noteObject);
    console.log("whenSaving");

    let tmp = JSON.stringify(noteObject);
    localStorage.setItem(noteObject.id, tmp);
    sortByDate();

    console.log(JSON.parse(localStorage.getItem(noteObject.id)));
    console.log("what saved");

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
    myNode.innerHTML = '<INPUT type = \"button\" id=\"AddButton\" VALUE=\"добавить заметку\">';

    sleep(10);
    for (let i = 0; i < divArr.length; i++) {
        console.log("before sorting +" + divArr[i].id + divArr[i].valueDate);
    }
    divArr.sort((prev, next) => (next.valueDate - prev.valueDate));

    for (let i = 0; i < divArr.length; i++) {
        document.getElementById("NoteList").appendChild(restoreNote(divArr[i]));
    }
}


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}