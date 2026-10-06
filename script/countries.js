function getData(url) {
  return new Promise(async (resolve) => {
    const file = await fetch(url);
    const data = await file.json();
    resolve(data);
  });
}

async function getCountries() {
  const countries = [];
  const countryRequestData = await getData(
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/country.json",
  );
  for (country in countryRequestData) {
    countries.push(countryRequestData[country]);
  }
  return countries;
}

async function setCountries() {
  const currencies = await getData("script/data/common_currency.json");
  const countries = await getCountries();
  const newCountries = [];
  let newCountry = {
    country: {
      name: { local: "Loris", common: "Lorem" },
      code: "LOR",
      number: -1,
    },
    currency: {
      name: { local: "Ipsium", common: "Ipsum" },
      symbol: { local: "I", common: "IPS" },
      rounding: -2,
      code: "IPS",
      number: -1,
    },
  };
  for (var oldCurrency in currencies) {
    newCountry.country.name.local = "Unknown";
    newCountry.currency.name.local = "Unknown";
    newCountry.currency.name.common = oldCurrency.name_plural;
    newCountry.currency.symbol.local = oldCurrency.symbol_native;
    newCountry.currency.symbol.common = oldCurrency.symbol;
    newCountry.currency.rounding = oldCurrency.decimal_digits;
    newCountry.currency.code = oldCurrency.code;

    let oldCountry = countries.find((country) => {
      return country.currency_code == oldCurrency.code;
    });
    newCountry.country.name.common = oldCountry.country_name;
    newCountry.country.code = oldCountry.country_iso3;
    newCountry.country.number = oldCountry.country_iso_numeric;
    newCountry.currency.number = oldCountry.currency_number;

    newCountries.push(newCountry);
  }
  console.log(newCountries);
}

setCountries();
