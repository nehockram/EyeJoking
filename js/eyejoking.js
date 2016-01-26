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

    //var jokeTitle = getJokeFromDB(whatItIs);
    //alert(whatItIs);
    //alert(getJokeFromDB(whatItIs));


    var transact = jokesDB.transaction(["allJokes"]);
    var myStore = transact.objectStore("allJokes");
    var index = myStore.index("title");
    var theJoke;

    index.get(whatItIs).onsuccess = function (event) {

        // theJoke = event.target.result.joke;
        //   alert("In getJoke " + event.target.result.joke);
        $("#displayJokeArea").html(event.target.result.joke);
    };

}
