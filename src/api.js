var _ = require('lodash');

var rootURl = 'http://api.openweathermap.org/data/2.5/weather?APPID=550539eab8fdb91ee4bc199e461d5f4d';

var kelveinToF = function(kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F'
};

module.exports = function(latitude, longitude) {
  var url = `${rootURl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    return {
    city: json.name,
    temperature: kelveinToF(json.main.temp),
    description: _.capitalize(json.weather[0].description)
  }
  });
}
