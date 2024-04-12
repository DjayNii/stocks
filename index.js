async function gettingData() {
  try {
    const inputField = document.querySelector(".symbol_input");

    const infoContainer = document.querySelector(".info");

    const symbol = inputField.value.toUpperCase();
    console.log(symbol);

    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=70N9808NO57B3S0I`
    );

    const responce2 = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}&interval=monthly&time_period=10&series_type=open&apikey=70N9808NO57B3S0I`
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
    const symbolNAME = dayChange["Global Quote"]["01. symbol"];
    const price = dayChange["Global Quote"]["08. previous close"];

    console.log(changePercent);

    infoContainer.innerHTML = `<p>${stockName}</p>
    <p> ${symbolNAME} </p>
    <p> ${price} </p>
    <p> ${changePercent}</p>
    <p>RSI Value</p> 
    <p> ${rsi}</p>`;

    infoContainer.style.display = "flex";
  } catch (error) {
    console.log(error);
  }
}
