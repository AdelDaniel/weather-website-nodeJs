require("dotenv").config(); //add .env to prevent the key to pushed to github

const geoCode = require("./utils/geo-code");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs"); //used to work with partials => partials are the repetitave parts of code in html

// both dirname and file name are for location of current file
// dirname: get the location of where is this file lives in  && filename:: prodives the path of file itself
// console.log(__dirname); //print:: J:\The_Complete_Node_Developer_Course_3rd Edition\web-server\src
// console.log(__filename); //print:: J:\The_Complete_Node_Developer_Course_3rd Edition\web-server\src\app.js
//-------------------------------------------------/

// method joins all given path segments together
//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

console.log(publicDirectoryPath);
const app = express();

const port = process.env.PORT || 3000; // port = process.env.PORT if it is Exist

//-------------------------------------------------/

// the next 2 lines to setup handlebars engines and view locations
app.set("view engine", "hbs"); ///hbs :: handle bar extension >> for the dynamic handler
app.set("views", viewsPath); // setting for the location of the views
hbs.registerPartials(partialsPath); // setting for the location of the Partials
//-------------------------------------------------/

/// the coming is the using the static documentations like html
// app.use() => get the html files and show it to user
// the next line for static doucment like html in the public folder
app.use(express.static(publicDirectoryPath));
//-------------------------------------------------/

const copyRights = "Node.js 30 Augest 2021 ";

app.get("", (req, res) => {
  //render one of our views
  // so we can render one of our handler bar templates
  // first argument is the particular view we wanna use 'index'>> index must match up with name at views
  // second argument is the object that we wanna that view to access
  res.render("index", {
    title: "Know Weather By Adel!",
    myName: "Adel Nabil",
    aboutPage: "This is the main page",
    copyRights: copyRights,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    aboutPage: "Know more about us",
    copyRights: copyRights,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    aboutPage: "If you need any Help you can find it here!",
    copyRights: copyRights,
  });
});

//the next get() method => is used to get the query from the user
app.get("/weather", (req, res) => {
  if (!req.query.q) {
    return res.send({
      error:
        'Oops! Something went Wrong "Please, Check the City Name you Entered"',
    });
  }
  geoCode.getGeoCode(req.query.q, (geoCodeError, geoCodeData) => {
    if (geoCodeError) {
      return res.send({ error: geoCodeError });
    }
    forecast.getForecast(geoCodeData, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ error: forecastError });
      }
      res.send({ geoCodeData, forecastData });
    });
  });
});

// this is to appear 404 page if the page doesn't exist in the help root (must be the last app.get()) www.ex.com/help/aaaaaaaaaa
app.get("/help/*", (req, res) => {
  res.render("error", {
    errorMessege: " The help article you try to find is not Exit :( ",
    copyRights: copyRights,
  });
});

// this is to appear 404 page if the page doesn't exist (must be the last app.get())www.ex.com/aaaaaaaaaa
app.get("*", (req, res) => {
  res.render("error", {
    errorMessege: " Oops SomeThing Went wrong :( ",
    copyRights: copyRights,
  });
});

// get() => used to get the request from the user and then send response to it
// app.get("", (req, res) => {
//   res.send("hello express");
// });
// app.get("/help", (req, res) => {
//   res.send("this is help Page");
// });
// app.get("/About", (req, res) => {
//   res.send("this is About Page");
// });

// the next method allow you to start the server and  get the data from server on port 3000
// so without it and without run app.js => you can not recive anything form app.get()
// and any change will need you to restart the server
app.listen(port, () => {
  console.log(`listen on server ${port}`);
});
