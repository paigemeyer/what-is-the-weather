function searchNow(event){
event.preventDefault();
let newSearch=document.querySelector("#new-city-input");
let cityElement=document.querySelector("#heading-city");
cityElement.innerHTML=newSearch.value;
}
let serachEngine=document.querySelector("#search-input");
serachEngine.addEventListener("submit", searchNow);