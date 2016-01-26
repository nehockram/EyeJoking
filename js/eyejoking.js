/**
 * Created by mark on 1/21/16.
 */

$(document).ready(function () {

    //Open DB
    openDB();

    $("#addJokeBtn").click(addJokeToDB);
    $("#theList").click(listBeenClicked);

});

function listBeenClicked(event) {
    var whatItIs = event.target.innerHTML;
    getJokeByTitle(whatItIs);
}

