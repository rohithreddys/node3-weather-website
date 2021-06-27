const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohith Reddy S'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rohith Reddy S'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help page',
        name: 'Rohith Reddy S'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, {forecastData}) => {
            if(error) {
                res.send({
                    error: error
                })
            }
            res.send({
                weather: forecastData,
                address: location
            })
        })
    })

    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Rohith Reddy S',
        errorMessage: 'Help article not found'
    })
    
})

app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Rohith Reddy S',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port' + port)
})