/**
 * Created by mark on 1/29/16.
 */
//set data
function dragged(e) {
    var listItemCode = '"<li>" + e.target.innerHTML + "</li>"';

    e.dataTransfer.setData("Text", listItemCode);

    console.log("drag is starting");
    console.log(e.target.innerHTML);
}

//get data
function dropped(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    //e.target.appendChild(data);
    console.log("dropped: " + data);
}


function allowDrop(ev) {
    ev.preventDefault();
}

//source of drag
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

}
