function searchNow(event){
event.preventDefault();
let SearchInput=document.querySelector("#new-city-input");
let cityElement=document.querySelector("#heading-city");
cityElement.innerHTML=SearchInput.value;
searchCity(SearchInput.value);


}
let serachEngine=document.querySelector("#search-input");
serachEngine.addEventListener("submit", searchNow);



function searchCity(city){
let apiKey="f333f4tb5038acab6309b2fo8d0b9912"
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(updateTemp);}

function updateTemp(response){
let temperature=document.querySelector("#temp");
let tempElement=response.data.temperature.current;
temperature.innerHTML=Math.round(tempElement);

let descriptionE=document.querySelector("#description");
let description=response.data.condition.description;
descriptionE.innerHTML=(description)

let humidity=document.querySelector("#Humidity");
let humidityE=response.data.temperature.humidity;
humidity.innerHTML= `${humidityE} %`;

let winds=document.querySelector("#wind");
let windElement=response.data.wind.speed;
winds.innerHTML= `${windElement} km/h`;

let time=document.querySelector("#time-date");
let date= new Date(response.data.time * 1000);
time.innerHTML= newDate(date);


 let iconElement=document.querySelector("#icons");
 iconElement.innerHTML=`<img src="${response.data.condition.icon_url}"class="icon"/>`;

getForecast(response.data.city);

}

function newDate(date){
   let days=["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   let day=days[date.getDay()];
   let hours= date.getHours();
   let minutes= date.getMinutes();

   if(minutes <10){
    minutes=`0${minutes}`;
   }

   return`${day} ${hours}:${minutes}`
}

function forecastDay(times){
let date= new Date(times *1000);

let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

return days[date.getDay()];
}

function getForecast(city){
   let apiKey="f333f4tb5038acab6309b2fo8d0b9912";
   let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
   axios(apiUrl).then(displayForecast);
}

function displayForecast(response){


   
   let forecastHtml="";

   response.data.daily.forEach(function(day, index){
      if(index < 5){
      forecastHtml=
      forecastHtml+
      `
    <div class="forecast-day1">
        <div class="day-forecast">${forecastDay(day.time)}</div>
        
        <img src="${day.condition.icon_url}" class="forecast-icon"/>
      
        <div class="forecast-temp">

            <div class="temperature-forecast"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="temperature-forecast">
                ${Math.round(day.temperature.minimum)}°</div>
        </div>
    </div>
      `;
      }
   });

   let forecastElement=document.querySelector("#forecast");
   forecastElement.innerHTML=forecastHtml;

}
displayForecast();