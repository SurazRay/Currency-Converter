const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const button = document.querySelector(".button");

//Fetching the chosen currencies

const from = document.querySelector(".from select");
const to = document.querySelector(".to select");

//Appending options in select tag to largen country choice -- 1

const options = document.querySelectorAll(".choose select");

for (let drop of options) {
    for (let code in countryList) {

        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;

        drop.append(newOption);

        if (drop.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (drop.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
    }
    //if new country chosen calling flag change function
    
    drop.addEventListener("change", (evt) => {
        updateFlag(evt.target);  //2
    });
}

//Changing the flag according to the country choice  -- 2

const updateFlag = (country) => {
    let sr = country.name;

    let flag = document.getElementById(sr);

    let code = country.value;
    countryCode = countryList[code];

    flag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;

};

//Adding API  --  3

button.addEventListener("click", async (evt) => {

    button.style.color = "red";

    evt.preventDefault();

    let amount = document.querySelector("#fromCurrency");
    let money = amount.value;

    if (money === "" || money < 1) {
        money = 1;
        amount.value = "1";
    }

    const newUrl = `${url}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;

    let getData = await fetch(newUrl);

    let data = await getData.json();

    output(data, money);  //4
});

// Showing output -- 4

const output = (rate, money) => {
    let out = document.querySelector(".output");
    out.innerText = money * rate[to.value.toLowerCase()];
};

//Changing Screen mode -- 5

let mode = document.querySelector(".mode");

let screen = "light";

mode.addEventListener("click", () => {
    if (screen !== "dark") {
        document.querySelector("body").classList.add("changeMode");
        screen = "dark";
    }
    else {
        document.querySelector("body").classList.remove("changeMode");
        screen = "light";
    }
});
