let input = document.querySelector(".perant .search > input");
let btn = document.querySelector(".perant .search > button");
let imgIcon = document.querySelector(".card .weather .icon img");
let temp = document.querySelector(".card .weather .temp .degree");
let description = document.querySelector(".description");
let humidity = document.querySelector(".humidity .text span:first-child");
let wind = document.querySelector(".wind .text span:first-child");
let city = document.querySelector(".city > span");
let pending = document.querySelector(".pending");

const getData = (apiLink, inputV) => {
  return new Promise((resolve, reject) => {
    let myRequest = new XMLHttpRequest();
    myRequest.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        this.status === 404
          ? reject(`" ${inputV} " isn't a valid city name`)
          : reject(Error("Something went wrong"));
      }
    };

    myRequest.open("GET", apiLink);
    myRequest.send();
  });
};
btn.onclick = function () {
  let inputV = input.value;
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${inputV}&units=metric&appid=3265874a2c77ae4a04bb96236a642d2f`;
  input.value = "";
  document.querySelector(".card").style.display = "none";
  document.querySelector(".error").style.display = "none";

  pending.classList.add("active");
  getData(api, inputV)
    .then((result) => {
      document.querySelector(".error").style.display = "none";
      temp.innerHTML = `${Math.floor(result.main.temp)}`;
      description.innerHTML = `${result.weather[0].description}`;
      city.innerHTML = `${result.name},${result.sys.country}`;
      humidity.innerHTML = `${result.main.humidity}%`;
      wind.innerHTML = `${result.wind.speed} km/h`;

      let id = result.weather[0].id;

      if (id == 800) {
        imgIcon.src = "icons/clear.svg";
      } else if (id >= 200 && id <= 232) {
        imgIcon.src = "icons/storm.svg";
      } else if (id >= 600 && id <= 622) {
        imgIcon.src = "icons/snow.svg";
      } else if (id >= 701 && id <= 781) {
        imgIcon.src = "icons/haze.svg";
      } else if (id >= 801 && id <= 804) {
        imgIcon.src = "icons/cloud.svg";
      } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        imgIcon.src = "icons/rain.svg";
      }
      pending.classList.remove("active");
      document.querySelector(".card").style.display = "block";
    })
    .catch((rej) => {
      pending.classList.remove("active");
      document.querySelector(".error").style.display = "flex";
      document.querySelector(".card").style.display = "none";
      document.querySelector(".error h3").textContent = `${rej}`;
    });
};
