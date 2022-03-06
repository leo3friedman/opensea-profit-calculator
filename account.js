// chrome.storage.sync.clear();

const defaultSettings = {
  collection: [],
};

function log() {
  console.log("DOM changed");
}

function storeInput(input, nftId) {
  console.log("changed");
  chrome.storage.sync.get(defaultSettings, function (result) {
    let newCollection = result.collection;
    console.log(newCollection);

    // the collection already has this object in it
    if (result.collection.some((e) => e.id === nftId)) {
      newCollection.find((e) => e.id === nftId).price = input.value;
    } else {
      newCollection.push({
        id: nftId,
        price: input.value,
      });
      console.log(newCollection);
    }
    chrome.storage.sync.set({ collection: newCollection });
  });
}

function addInputElement(parent) {
  chrome.storage.sync.get(defaultSettings, function (result) {
    const input = document.createElement("input");
    const href = parent.children[0].children[1].children[0].href;
    const nftId = href.replace("https://opensea.io/assets/", "");
    const nftObj = result.collection.find((e) => e.id === nftId);
    input.classList.add("cost-input");
    input.value = nftObj ? nftObj.price : "undefined";
    input.id = nftId;
    input.oninput = () => {
      storeInput(input, nftId);
    };
    input.style.position = "absolute";
    input.style.zIndex = "100";
    console.log(parent.children[1]);

    // parent.append(input);
    parent.insertBefore(input, parent.firstChild);
  });
}
function buildInputs() {
  const grid = document.querySelector("[role=grid]");
  const nftArr = Array.from(grid.children);
  const currInputsArr = Array.from(document.querySelectorAll(".cost-input"));

  const nftsWithoutInput = nftArr.filter(
    (nft) => !currInputsArr.includes(nft.children[0])
  );
  nftsWithoutInput.forEach((nft) => addInputElement(nft));
}

window.onload = () => {
  // const grid = document.querySelector("[role=grid]");
  // const nftArr = Array.from(grid.children);
  // nftArr.forEach((nft) => addInputElement(nft));

  buildInputs();
  const observerOptions = {
    childList: true,
    attributes: true,
    characterData: true,

    // Omit (or set to false) to observe only changes to the parent node
    subtree: true,
  };

  const observer = new MutationObserver(buildInputs);

  observer.observe(document.body, observerOptions);
};
