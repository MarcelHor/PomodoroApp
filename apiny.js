
fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    .then(value => {
        console.log(value);
    })
    .catch(reason => console.log(reason))

