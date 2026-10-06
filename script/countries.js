const titleMinorWords = RegExp(
  "(?<=\W)a|an|and|as|at|but|by|en|for|from|how|if|in|neither|nor|of|on|only|onto|out|or|per|so|than|that|the|to|until|up|upon|v|v\\.|versus|vs|vs\\.|via|when|with|without|yet(?=\W)",
  "gi",
);

function toTitleCase(name) {
  name = name.replace(/\w\S*/g, (match) => {
    return (
      match.substring(0, 1).toUpperCase() + match.substring(1).toLowerCase()
    );
  });
  name = name.replace(titleMinorWords, (match) => {
    return match.toLowerCase();
  });
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

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
  for (var i = 0; i < currencies.length; i++) {
    let oldCurrency = currencies[i];
    let oldCountry = countries.find((country) => {
      return country.currency_code == oldCurrency.code.toLowerCase();
    });
    if (oldCountry === undefined) {
      console.log("Error on " + oldCurrency.name_plural);
    } else {
      newCountry.country.name.local = "Unknown";
      newCountry.country.name.common = toTitleCase(oldCountry.country_name);
      newCountry.country.code = oldCountry.country_iso3;
      newCountry.country.number = oldCountry.country_iso_numeric;
      newCountry.currency.name.local = "Unknown";
      newCountry.currency.name.common = oldCurrency.name_plural;
      newCountry.currency.symbol.local = oldCurrency.symbol_native;
      newCountry.currency.symbol.common = oldCurrency.symbol;
      newCountry.currency.rounding = oldCurrency.decimal_digits;
      newCountry.currency.code = oldCurrency.code;
      newCountry.currency.number = oldCountry.currency_number;
    }
    newCountries.push(newCountry);
  }
  console.log(newCountries);
}

setCountries();
