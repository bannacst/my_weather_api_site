const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit",search)

let target = "delhi"

const fetchData = async(target) => {
try {
    const url = `https://api.weatherapi.com/v1/current.json?key=6a89c4a7958a4b36a74121914221807 &q=${target}`

    const response = await fetch (url);
    const data = await response.json();

    console.log(data);

    const {
        current : { temp_c,
            condition:{ text,icon } 
        },
        location : { name,localtime },
    } = data;

    updateDom(temp_c,name,localtime,icon,text);
} catch (error) {
    alert("Location not found");
}
};
function updateDom (temperature,city,time,emoji,text){

    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperatureField.innerText = `${temperature}°C`;
    cityField.innerText = city

    dateField.innerText = `${exactTime} - ${exactDay}  ${exactDate}`;

    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);
    
function search(e){
    e.preventDefault();

    target = searchField.value;

    fetchData(target);
}

function getDayFullName (num){
    switch (num){
        case 0 :
            return 'Sunday';
            break;
        case 1:
            return 'Monday';
            break;
        case 2:
            return 'Tuesday';
            break;
        case 3:
            return 'Wednesday';
            break;
        case 4:
            return 'Thursday';
            break;
        case 5:
            return 'Friday';
            break;
        case 6:
            return 'Saturday';
            break;
        default:
            return 'nothing';
    }
}
