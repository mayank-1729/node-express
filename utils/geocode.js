const request = require('request')

function geocode(address, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWstdGVzdDEyMyIsImEiOiJja2N3cmtkZHowZ3V2MzBzMTdqMHdpcm41In0.1XtHscJSaVRIR9RHGSrZ6A&limit=1'

    request({uri: url, json: true}, (error, response)=>{
        if (error){
            callback('Unable to reach the Geo-location api.', undefined)
        }else {
            if (response.statusCode != 200){
                callback(response.body.message, undefined)
            }else {
                if (response.body.features.length == 0){
                    callback('Unable to find the location. Please provide proper value.', undefined)
                }else{
                    callback(undefined, {
                        latitude: response.body.features[0].center[1],
                        longitude: response.body.features[0].center[0],
                        location: response.body.features[0].place_name
                    }) 
                }
                
            }
        }
    })
}



module.exports = geocode;