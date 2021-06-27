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
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                pressure: body.current.pressure,
                location: body.location.name
            })
        }
    })
}

module.exports = forecast