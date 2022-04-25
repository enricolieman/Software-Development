const wrapper = document.querySelector('.wrapper'),
  inputPart = wrapper.querySelector('.input-part'),
  infoTxt = inputPart.querySelector('.info-txt'),
  inputField = inputPart.querySelector('input'),
  locationBtn = inputPart.querySelector('button');

let api;

inputField.addEventListener('keyup', (e) => {
  // if user pressed enter btn adn input value is not empty
  if (e.key == 'Enter' && inputField.value != '') {
    console.log('Hello');
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    // if browser support geolocation
    navigator.geolocation.getCurrentPosition(OnSuccess, OnError);
  } else {
    alert('Your browser did not support geolocation API');
  }
});

function OnSuccess(position) {
  const { latitude, longitude } = position.coords; //getting lat & lon of the user device form coords object
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=528d646905c6170637b216b544c947ab`;
  fetchData();
}

function OnError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add('error');
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=528d646905c6170637b216b544c947ab`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = 'Getting weather details...';
  infoTxt.classList.add('pending');
  // getting api response and returning it with parsing into js obj and in another
  // then function calling weatherDetails function with passing api result as an argument
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  if (info.cod == '404') {
    infoTxt.classList.replace('pending', 'error');
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  }
  console.log(info);
}
