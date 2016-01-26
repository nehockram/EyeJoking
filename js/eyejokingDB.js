/**
 * Created by mark on 1/21/16.
 */

var jokesDB;

function openDB() {
    var openRequest = window.indexedDB.open("jokesDB", 4);

    openRequest.onerror = function () {
        alert("Why didn't you allow my web app to use IndexedDB?!");
    };
    openRequest.onsuccess = function (event) {
        jokesDB = event.target.result;
        console.log("database has been opened");
        showList();
        // getJokeFromDB();

    };
    openRequest.onupgradeneeded = function (event) {
        var db = event.target.result;

        //db.deleteObjectStore("allJokes");

        var objectStore = db.createObjectStore("allJokes", {keyPath: "id", autoIncrement: true});

        objectStore.createIndex("title", 'title');

        console.log("database has been upgraded");
    };
}

function addJokeToDB() {
    //get fields
    var jokeTitle = $("#tfJokeTitle").val();
    var theJoke = $("#taTheJoke").val();

    //add a joke to DB
    var transactionReq = jokesDB.transaction(["allJokes"], "readwrite");
    var myStore = transactionReq.objectStore("allJokes");
    var addReq = myStore.add({title: jokeTitle, joke: theJoke});
    addReq.onsuccess = function () {
        showList();
        console.log("a joke has been added " + jokeTitle + ": " + theJoke);
    };

    clearTheFields();
}

function showList(event) {
    var transact = jokesDB.transaction(["allJokes"]);
    var myStore = transact.objectStore("allJokes");

    $("#theList").empty();

    myStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
            $("#theList").append("<li>" + cursor.value.title + "</li>");
            cursor.continue();

        }
        else {
            console.log("No more entries!");
        }
    };


}

function clearTheFields() {
    //clear the fields
    $("#tfJokeTitle").val("");
    $("#taTheJoke").val("");
}
