console.log("ran");
const defaultSettings = {
  collection: [],
};
// function getCost(nftId) {
//   let cost;
//   chrome.storage.sync.get(defaultSettings, function (result) {
//     cost = result.collection.find((e) => e.id === nftId).price;
//   });
//   return cost;
// }

function calculateProfit(price, cost, fees) {
  return (price - price * fees - cost).toFixed(4);
}
function breakEvenPrice(cost, fees) {
  return (cost / (1 - fees)).toFixed(4);
}

window.onload = () => {
  const newDiv = document.createElement("div");
  const input = document.querySelector("[name=price]");
  const url = window.location.href;
  const nftId = url
    .replace("https://opensea.io/assets/", "")
    .replace("/sell", "");

  chrome.storage.sync.get(defaultSettings, function (result) {
    const cost = result.collection.find((e) => e.id === nftId).price;
    const newContent = document.createTextNode(
      `BREAKEVEN: ${breakEvenPrice(cost, 0.125)}`
    );
    newDiv.appendChild(newContent);
    input.parentElement.appendChild(newDiv);

    newDiv.style.zIndex = "9999";

    input.oninput = () => {
      if (input.value === "") {
        newDiv.innerText = `BREAKEVEN: ${breakEvenPrice(cost, 0.125)}`;
      } else {
        newDiv.innerText = `PROFIT: ${calculateProfit(
          input.value,
          cost,
          0.125
        )}`;
      }
    };
  });
  console.log(nftId);
};
