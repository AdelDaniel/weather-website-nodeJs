const request = require("postman-request");
const keys = require("./api-keys");

/// here in this getting data form api there are 2 types of errors
/// 1:: is the low level error :ex: internet connection error
/// 2:: is from the server and it's returend in the body

const getGeoCode = (address, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${keys.mapboxKey}&limit=1`;

  request(
    { url: mapboxUrl, json: true },
    async function (error, response, body) {
      if (error) {
        callback(
          "Oops! :: Unable to connnect to location service! :: Check Your Interent Connection!!",
          undefined
        );
      } else if (body.message) {
        callback(
          "Oops! :: something went wrong During Get The Location!!",
          undefined
        );
      } else if (body.features.length === 0) {
        callback(
          "Oops! :: something went wrong During Get The Location <Not Valid Loction Name>!!",
          undefined
        );
      } else {
        callback(undefined, {
          place_name: body.features[0].place_name,
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
        });

        // console.log(
        //   `you Searched For: "${body.features[0].place_name}"  \n And It's \t longitude = ${body.features[0].center[0]} , \t latitude =${body.features[0].center[1]} `
        // );
        // fs.writeFileSync("mapbox-test-file.json", JSON.stringify(body));
      }
    }
  );
};

module.exports = {
  getGeoCode: getGeoCode,
};
