const request = require('request')

function forecast(lat, long, callback){
    const url = 'http://api.weatherstack.com/current?access_key=b535fbefebb872674ecda35c7be820c4&query='+ encodeURIComponent(lat) +','+ encodeURIComponent(long) +'&units=m';

    request({uri: url, json:true}, (error, response)=>{
        if (error) {
            callback('Unable to reach the web service api.', undefined)
        }else{
            if (response.body.error){
                callback('Please provide proper address.', undefined)
            }else{
                callback(undefined, {temperature: response.body.current.temperature, 
                    feelslike: response.body.current.feelslike,
                    description: response.body.current.weather_descriptions[0]})
            }
        }
    })
}

module.exports = forecast;