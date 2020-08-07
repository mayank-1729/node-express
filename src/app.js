const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('../utils/forecast');
const geocode = require('../utils/geocode');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mayank Dubey'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mayank Dubey'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Center',
        message: 'I am here to help you...',
        name: 'Mayank Dubey'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({ error: 'Please provide the location to fetch the weather.' })
    }

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ 'error': error });
        }
        console.log('Place: ', location);
        forecast(latitude, longitude, (error, { temperature, feelslike, description } = {}) => {
            if (error) {
                return res.send({ 'error': error });
            }
            console.log('Its', description, '. Temperature is', temperature, 'but it feels like', feelslike, '.');
            return res.send({ 'description': description, 'temperature': temperature, 'feelslike': feelslike })
        })
    })

    // var respObj = geocode()
    // res.send({
    //     location: req.query.location,
    //     weather: 'Rainly'
    // })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help Center',
        errorMsg: 'Help article not found.',
        name: 'Mayank Dubey'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Help Center',
        errorMsg: 'Requested page not found.',
        name: 'Mayank Dubey'
    })
})


app.listen(port, () => {
    console.log('Server started at 3000');
})