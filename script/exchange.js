function getData(url) {
  return new Promise(async (resolve) => {
    const file = await fetch(url);
    const data = await file.json();
    resolve(data);
  });
}

async function setCountries() {
  const data = await getData("script/common_currency.json");
  for (currency in data) {
    // item.country.name.local = ???
    // item.country.name.common = (Country JSON)
    // item.country.code = (Country JSON)
    // item.country.number = (Country JSON)
    // item.currency.name.local = ???
    // item.currency.name.common = currency.name_plural
    // item.currency.symbol.local = currency.symbol_native
    // item.currency.symbol.common = currency.symbol
    // item.currency.rounding = currency.decimal_digits
    // item.currency.code = currency.code
    // item.currency.number = (Currency JSON)
  }
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
