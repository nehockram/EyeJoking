/**
 * Created by mark on 1/21/16.
 */

$(document).ready(function () {

    //Open DB
    openDB();

    $("#addJokeBtn").click(addJokeToDB);
    $("#theList").click(listBeenClicked);
    $("#theList").dblclick(deleteJokeFromDB);

});

function listBeenClicked(event) {
    var whatItIs = event.target.innerHTML;
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
        }
        else {
            console.log("No more entries!");
        }
    };


}

