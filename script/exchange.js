function getData(url) {
  return new Promise(async (resolve) => {
    const file = await fetch(url);
    const data = await file.json();
    resolve(data);
  });
}

async function getCurrencyData() {
  const data = await getData(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
  );
}

async function getCurrencyName() {
  //const d = await getData("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/country.json");
  const data = await getData("script/common_currency.json");
}

function convertInput() {}
