const inputField = document.querySelector(".symbol_input");

function gettingData() {
  const symbol = inputField.value.toUpperCase();
  console.log(symbol);
  fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=GA37MSBWNWIP2LFL`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
}
