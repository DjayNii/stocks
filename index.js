async function gettingData() {
  try {
    const inputField = document.querySelector(".symbol_input");

    const infoContainer = document.querySelector(".info");

    const rsiContainer = document.querySelector(".rsidiv");

    const displayResultContainer = document.querySelector(".bottom");
    const displayResultContainer2 = document.querySelector(".bottom2");

    const blurLayer = document.querySelector(".blurLayer2");

    const symbol = inputField.value.toUpperCase();
    console.log(symbol);

    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=70N9808NO57B3S0I`
    );

    const responce2 = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=weekly&time_period=10&series_type=open&apikey=70N9808NO57B3S0I`
    );

    const responce3 = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=70N9808NO57B3S0I`
    );

    if (!response.ok) {
      throw new Error(`error in getting deatils `);
    }

    const data = await response.json();
    const rsiData = await responce2.json();
    const dayChange = await responce3.json();

    console.log(data);
    console.log(rsiData);
    console.log(dayChange);

    const stockData = data.bestMatches[0];

    const dates = rsiData["Technical Analysis: RSI"];
    const dateKeys = Object.keys(dates);
    const latestDate = dateKeys[0];
    console.log("Latest Date:", latestDate);

    const rsi = rsiData["Technical Analysis: RSI"][latestDate]["RSI"];
    console.log(rsi);

    const stockName = stockData["2. name"];

    const changePercent = dayChange["Global Quote"]["10. change percent"];
    const smbNAME = dayChange["Global Quote"]["01. symbol"];

    const parts = smbNAME.split(".");

    const SYMBOl = parts[0];

    const price = dayChange["Global Quote"]["08. previous close"];

    console.log(changePercent);

    infoContainer.innerHTML = `
    <div class = "top1">
    <p class = "stockName">${stockName}</p>
    <p class = "symbolName"> ${SYMBOl} </p>
    </div>
    <div class = "top2">
    <div class = topright>
    <p class = "price"> ${price} </p>
    <p class = "ChangePercent"> ${changePercent}</p>
    </div>
    <div class = topleft>
    <p class = "RsiVAlue">RSI Value</p> 
    <p class = "RSI"> ${rsi}</p>
    </div>
    </div>`;

    displayResultContainer.style.display = "flex";
    displayResultContainer2.style.display = "flex";
    infoContainer.style.display = "flex";

    if (rsi > 70) {
      rsiContainer.innerHTML = `
      <div  class = "signal">
      <p>SELL</p>
      </div>
      <div class = "suggestion">
      <p>Over-Bought zone </p> 
      <p>May lead to short positions or profits, but watch out for bearish reversals</p>
      </div>`;
      rsiContainer.style.display = "flex";
      displayResultContainer2.style.backgroundColor = "#51ca14";
      blurLayer.style.backgroundColor = "#77f837;";
    } else if (rsi < 30) {
      rsiContainer.innerHTML = `
      <div  class = "signal">
      <p>BUY</p>
      </div>
      <div class = "suggestion">
      <p>Over-Sold zone </p> 
      <p>May lead to long positions or buying opportunities, but watch out for bullish reversals</p>
      </div>`;
      rsiContainer.style.display = "flex";
      displayResultContainer2.style.backgroundColor = "#CE2029";
      blurLayer.style.backgroundColor = "#F11924";
    } else {
      rsiContainer.innerHTML = `
      <div  class = "signal">
      <p>HOLD</p>
      </div>
      <div class = "suggestion">
      <p>Market neutral</p> 
      <p>May lead to cautious trading as there are no clear signals for buying or selling</p>
      </div>`;
      rsiContainer.style.display = "flex";
      displayResultContainer2.style.backgroundColor = "#110C09";
      blurLayer.style.backgroundColor = "#483C32";
    }
  } catch (error) {
    console.log(error);
  }
}
