console.log("client side JavaScript file!");
const searchForm = document.querySelector("#searchForm");
const mainMessage = document.querySelector("#main-message");
const dataMessage = document.querySelector("#data-message");

const url = "/weather?q=";
const fetchData = (cityName = "") =>
  fetch(`${url}${cityName}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        mainMessage.textContent = data.error;
      } else {
        mainMessage.textContent = `  The Weather At: ${data.geoCodeData.place_name}`;
        dataMessage.textContent = `  Is: ${data.forecastData.temperature} and you feels like: ${data.forecastData.feelslike}`;
        console.log(data);
      }
    });
  });

const onSubmit = (event) => {
  event.preventDefault();
  mainMessage.textContent = "Loading......";
  dataMessage.textContent = "";
  const value = searchForm.elements.q.value;
  console.log(value);
  fetchData(value);
};

searchForm.addEventListener("submit", onSubmit);
