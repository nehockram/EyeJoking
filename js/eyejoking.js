/**
 * Created by mark on 1/21/16.
 */
"use strict";
var setList = document.getElementById("setList");

document.addEventListener('DOMContentLoaded', function () {
    //Open DB
    openDB();
    //set up Elements
    init();
}, false);

function init() {
    var btnAddJoke = document.getElementById("addJokeBtn");
    btnAddJoke.addEventListener("click", addJokeToDB);

    var theFullList = document.getElementById("theList");
    theFullList.addEventListener("click", listBeenClicked);
    theFullList.addEventListener("dblclick", deleteJokeFromDB);

    setList.addEventListener("drop", dropped);
    setList.addEventListener("dragenter", entering);
    setList.addEventListener("dragleave", leaving);
    setList.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

}

function listBeenClicked(event) {
    var whatItIs = event.target.innerHTML;

    event.target.setAttribute("draggable", true);
    event.target.addEventListener("dragstart", dragged);

    getJoke(whatItIs);
}

function clearTheFields() {
    //clear the fields
    document.getElementById("tfJokeTitle").value = "";
    document.getElementById("taTheJoke").value = "";
}

function emptyList() {
    var ul = document.getElementById("theList");
    if (ul) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
    }
}

function showList() {
    var transact = jokesDB.transaction(["allJokes"]);
    var myStore = transact.objectStore("allJokes");

    //empty the list
    emptyList();

    //open and loop through cursor
    myStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        var theList = document.getElementById("theList");

        if (cursor) {
            // $("#theList").append("<li>" + cursor.value.title + "</li>");
            var elem = document.createElement("LI");
            var txty = document.createTextNode(cursor.value.title);
            elem.appendChild(txty);
            theList.appendChild(elem);
            cursor.continue();
        } else {
            console.log("No more entries!");
        }
    };


}

function checkForDupe(title) {
    var theList = document.getElementById("setList");
    var listItems = theList.getElementsByTagName("li");
    var thereIsADupe = false;

    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].innerHTML == title) {
            thereIsADupe = true;
            console.log("Its a dupe bitch");
        }
    }

    return thereIsADupe;
}
