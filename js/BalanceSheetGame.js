function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let draggedBox = event.dataTransfer.getData("text");

    if(draggedBox.id == 'a1' && event.target.id == 'q1') {
        event.target.appendChild(document.getElementById(draggedBox));
    }
    
}