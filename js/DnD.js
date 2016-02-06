/**
 * Created by mark on 1/29/16.
 */
//set data
function dragged(e) {
    var listItemCode = e.target.innerHTML;

    e.dataTransfer.setData("Text", listItemCode);

    console.log("drag is starting");
    console.log(e.target.innerHTML);
}

//get data
function dropped(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var aLi = document.createElement("LI");
    var textNode = document.createTextNode(data);
    aLi.appendChild(textNode);

    setList.appendChild(aLi);
    //alert("dropped: " + data);
}

function entering(e) {
    e.preventDefault();
    setList.style.background = "yellow";
}

function leaving(e) {
    e.preventDefault();
    setList.style.background = "#FFFFFF";
}


function allowDrop(ev) {
    ev.preventDefault();
}

//source of drag
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

//function drop(ev) {
//    ev.preventDefault();
//
//}
