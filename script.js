const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".search-container"),
    infoTxt = inputPart.querySelector(".info"),
    inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);  
    }
})

function requestApi(city) {
    console.log(city);
}
