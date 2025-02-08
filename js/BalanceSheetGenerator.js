const income = [];
const revenue = [];
const assets = [];
const liabilities = [];

function assignValues() {
    const incomeDivs = document.querySelector('.income');
    incomeDivs.array.forEach(div => {        
        div.textContent = Math.floor(Math.random() * income.length);
    });

    const revenueDivs = document.querySelector('.revenue');
    revenueDivs.array.forEach(div => {
        div.textContent = Math.floor(Math.random() * revenue.length);
    });

    const assetsDivs = document.querySelector('.assets');
    assetsDivs.array.forEach(div => {
        div.textContent = Math.floor(Math.random() * assets.length);
    });

    const liabilitiesDivs = document.querySelector('.liability');
    liabilitiesDivs.array.forEach(div => {
        div.textContent = Math.floor(Math.random() * liabilities.length);
    });
}

window.onload = assignValues;