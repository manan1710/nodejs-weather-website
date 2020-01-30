const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/7f7f6643395ef1adf5db074498ca2cfe/'+latitude+','+longitude+'?units=si'

    request({ url: url, json: true},(error, response) => {
        if(error)
        {
            callback('Unable to connect to location services !',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find location. Try another search. !',undefined)
        }
        else{
            callback(undefined, response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out there and '+response.body.currently.precipProbability+'% chance of rain. Min Temperature : '+response.body.daily.data[0].temperatureMin)
        }
    })
}

module.exports = forecast