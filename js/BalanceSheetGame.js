let cashValue = 150000;
let revenue = 150000;
let opCosts = 0;
let cogs = 0;
let income = 150000;
let profit = 150000;
let assets = 0;
let liabilities = 0;
let shEquity = 0;

let tempVal = 0;
let tempName = "";

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
    tempVal = event.target.dataset.value;
    tempName = event.target.getAttribute("name");
}

function drop(event) {
    event.preventDefault();
    let draggedBox = event.dataTransfer.getData("text");

    if( draggedBox == "a1" && event.target.id == "q1" ||
        draggedBox == "a2" && event.target.id == "q2" ||
        draggedBox == "a3" && event.target.id == "q3" ||
        draggedBox == "a4" && event.target.id == "q4" ||
        draggedBox == "a5" && event.target.id == "q5" 
    ){
        event.target.appendChild(document.getElementsByName(tempName).item(0));
        
        if (draggedBox == "a1") {        
            revenue = revenue + parseFloat(tempVal);
        }
        if (draggedBox == "a2") {
            opCosts = opCosts + parseFloat(tempVal);
        }
        if (draggedBox == "a3") {
            cogs = cogs + parseFloat(tempVal);
        }
        if (draggedBox == "a4") {
            assets = assets + parseFloat(tempVal);
        }
        if (draggedBox == "a5") {
            liabilities = liabilities + parseFloat(tempVal);
        }

    } else {
        cashValue -= 15000;
        
    }

    income = cashValue + revenue - opCosts;
    profit = cashValue + revenue - cogs;
    shEquity = assets - liabilities;

    document.getElementById("cashDisplay").innerText = cashValue;
    document.getElementById("revenue").innerText = revenue + cashValue;
    document.getElementById("opCosts").innerText = opCosts;
    document.getElementById("cogs").innerText = cogs;
    document.getElementById("income").innerText = income;
    document.getElementById("profit").innerText = profit;
    document.getElementById("assets").innerText = assets;
    document.getElementById("liabilities").innerText = liabilities;
    document.getElementById("shEquity").innerText = shEquity;
}