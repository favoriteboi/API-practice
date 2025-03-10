const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const tempMin = document.getElementById('tempMin');
const tempMax = document.getElementById('tempMax');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let dateObj = new Date(); //JS uses device date when we call date()
let month = months[dateObj.getUTCMonth()]; //returns an index from the array
let day = dateObj.getUTCDate() - 1; //we subtract 1 cause we want it to report yesterday
let year = dateObj.getUTCFullYear();

date.innerHTML = `${month} ${day}, ${year}`;

const app = document.getElementById('app');


const getWeather = async () => {
  try {
    const searchBarInput =  document.getElementById('searchBarInput')
    const cityName = searchBarInput.value.trim();
    const apiKey = '8e7439977f094f9af8b80db76489e389'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`       
    searchBarInput.value = ''; //clear input after submitting city name
    
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    });

    const weatherData = await response.json();
    console.log(weatherData)


    //update DOM
    city.innerHTML = `${weatherData.name}`;
    description.innerHTML = `${weatherData.weather[0].main}`
    tempImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather icon"/>`;
    temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}°C</h2>`;
    tempMax.innerHTML = `${weatherData.main.temp_max}°C`
    tempMin.innerHTML = `${weatherData.main.temp_min}°C`;
    
  }
  catch(error)  {
    console.log(error)
  }
  
}


//To avoid Undefined, we should not call the function when the page loads but only when we hit the search button
//getWeather('london')

document.getElementById('searchIcon').addEventListener('click', getWeather);

document.getElementById('searchBarInput').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeather();
  }
})




