/**
 * Created by mark on 1/21/16.
 */

var jokesDB;

function openDB() {
    var openRequest = window.indexedDB.open("jokesDB", 6);

    openRequest.onerror = function () {
        alert("Why didn't you allow my web app to use IndexedDB?!");
    };
    openRequest.onsuccess = function (event) {
        jokesDB = event.target.result;
        console.log("database has been opened");
        showList();

    };
    openRequest.onupgradeneeded = function (event) {
        var db = event.target.result;

        // db.deleteObjectStore("allJokes");

        var objectStore = db.createObjectStore("allJokes", {keyPath: "title"});

        // objectStore.createIndex("title", 'title');

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

function deleteJokeFromDB(ev) {
    var title = ev.target.innerHTML;

    var transactionReq = jokesDB.transaction(["allJokes"], "readwrite");
    var myStore = transactionReq.objectStore("allJokes");
    var answer = confirm("Are you sure you want to delete " + title);
    console.log(answer);
    if (answer) {
        var deleteReq = myStore.delete(title);
        deleteReq.onsuccess = function () {
            $("#displayJokeArea").html(title + " has been deleted");
        };
        deleteReq.onerror = function (e) {
            alert(e + " :something is fucked");
        };

        showList();
    }

}

function getJoke(title) {
    var transact = jokesDB.transaction(["allJokes"]);
    var myStore = transact.objectStore("allJokes");
    var getReq = myStore.get(title);
    getReq.onsuccess = function () {
        //alert("In getJoke " + getReq.result.joke);
        $("#displayJokeArea").html(getReq.result.joke);

        //
        return getReq.result.joke;
    };

}
