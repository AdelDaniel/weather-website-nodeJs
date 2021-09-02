const request = require("postman-request");

/// here in this getting data form api there are 2 types of errors
/// 1:: is the low level error :ex: internet connection error
/// 2:: is from the server and it's returend in the body

const WeatherStackKey = process.env.WEATHER_STACK_KEY;

const getForecast = ({ latitude, longitude } = {}, callback) => {
  const WeatherStackUrl = `http://api.weatherstack.com/current?access_key=${WeatherStackKey}&query=${latitude},${longitude}&units=m`;

  //json :true >>> this will return parsed object so >>  no need fpr JSON.parse(body)
  request(
    { url: WeatherStackUrl, json: true },
    async function (error, response, body) {
      // if error have value then the response is not && if response have value then the not is not
      if (error) {
        // Low Level error Happen
        callback(
          "Oops! :: Unable to connnect to web service. Please Check Your Interent Connection!!",
          undefined
        );
      } else {
        if (body.error) {
          callback(
            "Oops! :: something went wrong During Get The Weather!! ",
            undefined
          );
          //   console.log(`\t ${body.error.info}`);
        } else {
          //Every thing is ok baby
          callback(undefined, {
            temperature: body.current.temperature,
            feelslike: body.current.feelslike,
          });
          // console.log(
          //   `The Temperature is :: ${body.current.temperature} :: And You Feels Like :: ${body.current.feelslike} :: \n `
          // );
          // fs.writeFileSync("WeatherStack-test-file.json", JSON.stringify(body));
        }
      }
    }
  );
};

module.exports = {
  getForecast: getForecast,
};
