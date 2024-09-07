async function gettingData() {
  try {
    let preloader = document.querySelector(".preloader");

    preloader.style.display = "flex";
    const inputField = document.querySelector(".symbol_input");

    const infoContainer = document.querySelector(".info");

    const rsiContainer = document.querySelector(".rsidiv");

    const displayResultContainer = document.querySelector(".bottom");
    const displayResultContainer2 = document.querySelector(".bottom2");

    const blurLayer = document.querySelector(".blurLayer2");

    const symbol = inputField.value.toUpperCase();
    console.log(symbol);

    const stockExchange = "BSE";
    console.log(stockExchange);

    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}.${stockExchange}&apikey=70N9808NO57B3S0I`
    );

    const responce2 = await fetch(
      `https://www.alphavantage.co/query?function=RSI&symbol=${symbol}.${stockExchange}&interval=daily&time_period=14&series_type=open&apikey=70N9808NO57B3S0I`
    );

    const responce3 = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}.${stockExchange}&apikey=70N9808NO57B3S0I`
    );

    if (!response.ok) {
      preloader.style.display = "none";
      throw new Error(`error in getting deatils `);
    }
    preloader.style.display = "none";

    const data = await response.json();
    const rsiData = await responce2.json();
    const dayChange = await responce3.json();

    console.log(data);

    if (
      data &&
      data.Information &&
      data.Information.includes(
        "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day. Please subscribe to any of the premium plans at https://www.alphavantage.co/premium/ to instantly remove all daily rate limits."
      )
    ) {
      throw new Error("API limit reached. Come back tomorrow.");
    }
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
    if (error.message.includes("API limit reached. Come back tomorrow.")) {
      toggleApi();
    } else if (error instanceof TypeError) {
      // Handle network or fetch-related TypeErrors
      console.error("Network error or fetch failed:", error);
    } else {
      // Handle other kinds of errors
      console.error("An unexpected error occurred:", error);
    }
  }
}

let apiEndMSG = document.querySelector(".apiended");

function toggleApi() {
  const currentDisplay = window.getComputedStyle(apiEndMSG).display;

  if (currentDisplay === "none") {
    apiEndMSG.style.display = "flex"; /* Or your desired display value */
  } else {
    apiEndMSG.style.display = "none";
  }
}

function instructionsLoader() {
  const instructionsButton = document.querySelector(".instructions");
  const instructions = document.querySelector(".instructionsConstiner");

  const animate = new TimelineLite({ paused: true, reversed: true });

  animate.fromTo(
    instructions,
    0.5,
    {
      opacity: 0,
      display: "none",
      ease: Power2.easeOut,
      height: "0%",
      width: "0%",
    },
    {
      opacity: 1,

      display: "flex",
      height: "100%",
      width: "100%",
      onComplete: () => {
        instructions.style.pointerEvents = "auto";
        console.log("done");
      },
    }
  );

  instructionsButton.addEventListener("click", () => {
    toggleTween(animate);
  });

  function toggleTween(tween) {
    tween.reversed() ? tween.play() : tween.reverse();
  }
}

instructionsLoader();

function loadingScreen() {
  gsap.to(".loader", {
    rotate: 360,
    duration: 1,
    repeat: -1,
    ease: "none",
  });
}

loadingScreen();
