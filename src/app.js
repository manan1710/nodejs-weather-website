const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// this line help express to load static pages from 'public' Directory
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

// Setup partials for Express
hbs.registerPartials(partialsPath)

// for root ('') path
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Manan Vaghela'
    })
})

// for '/help' path 
app.get('/help', (req, res) => {
    //res.send('Help page')
    res.render('help',{
        title: 'Help Page',
        name: 'Manan Vaghela',
        helpmsg : 'This page contain some helpful sources.'
    })
})

// for '/about' path
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Manan Vaghela'
    })
}) 

// for '/weather' page
/* app.get('/weather', (req, res) => {
    res.send({
        location: 'Ahmedabad',
        forecast: 20 
    })
}) */

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide address in query string !'
        })
    }


    // {latitude, longitude, location} = {} ---> This line means we are giving default empty object if no object is provided by server.
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({
                error      // It means   error : error   known as property shorthand
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// Error Page for '/help/*'
app.get('/help/*', (req, res) => {
    res.render('errorpage',{
        title: 'Error 404',
        errorMessage: 'Help article not found !',
        name: '404 Error Page'
    })
})

// Error page
app.get('*', (req, res) => {
    //res.send('Error 404 : Page not Found !')
    res.render('errorpage',{
        title: 'Error 404',
        errorMessage: 'Page not found !',
        name: '404 Error Page'
    })
})



// Starting Express Server on port 3000
app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})