const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b70d2d7a8f0a6f3adc8ab5de1f192dbf&query=' + latitude + ' ' + longitude
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find weather', undefined)
        } else {
            callback(undefined, {
                forecastData: `The temperature is ${body.current.temperature}\u00B0C but it feels like ${body.current.feelslike}\u00B0C, humidity is ${body.current.humidity} and the pressure is ${body.current.pressure}bars.\n The weather is ${body.current.weather_descriptions}, cloud cover is ${body.current.cloudcover}% and the precipitation is ${body.current.precip}.\n The wind speed is ${body.current.wind_speed} and wind direction is ${body.current.wind_dir}`
            })
        }
    })
}

module.exports = forecast