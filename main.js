console.log("ran");
window.onload = () => {
    const newDiv = document.createElement("div");
    const input = document.querySelector("[name=price]");
    const newContent = document.createTextNode(`BREAKEVEN: ${breakEvenPrice(2, .125)}`);
    const url = window.location.href;
    const nft = url.replace("https://opensea.io/assets/","").replace("/sell","");

    newDiv.appendChild(newContent);

    input.parentElement.appendChild(newDiv);

    function calculateProfit(price, cost, fees){
        return price-price * fees - cost
    }
    function breakEvenPrice(cost, fees){
        return (cost /(1-fees)).toFixed(3)
    }

    newDiv.style.zIndex = "9999";

    input.oninput = () => {
        if(input.value === ''){
            newDiv.innerText = `BREAKEVEN: ${breakEvenPrice(2, .125)}`
        } else {
            newDiv.innerText = `PROFIT: ${calculateProfit(input.value, 2,.125)}`;
        }
    }
    console.log(nft)
}