/**
 * Created by mark on 1/21/16.
 */
"use strict";
var setList = document.getElementById("setList");

//document.addEventListener("load", init);

$(document).ready(function () {
    //Open DB
    openDB();
    //set up Elements
    init();

});

function init() {
    $("#addJokeBtn").click(addJokeToDB);
    $("#theList").click(listBeenClicked);
    $("#theList").dblclick(deleteJokeFromDB);


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
    $("#tfJokeTitle").val("");
    $("#taTheJoke").val("");
}

function showList() {
    var transact = jokesDB.transaction(["allJokes"]);
    var myStore = transact.objectStore("allJokes");

    //empty the list
    $("#theList").empty();

    //open and loop through cursor
    myStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            $("#theList").append("<li>" + cursor.value.title + "</li>");
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