const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".search-container"),
    infoTxt = inputPart.querySelector(".info"),
    inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);  
    }
})

const apiKey = 
function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(api).then(response => console.log(response.json()));
}
