const path = require('path')
const express = require('express')
const hbs = require('hbs')
let sites_list = require('./dashboard_scripts.js')
const fs = require('fs')
const request = require('request')
const app = express()
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// LINKS TO HTML PAGES
app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Account Level Dashboard: login'
    })
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Account Level Dashboard'
    }) 
})
app.get('', (req, res) => {
    res.render('login', {
        title: 'Account Level Dashboard: login'
    })
})
app.get('/bulk_changes', (req, res) => {
    res.render('bulk_changes', {
        title: 'Account Level Dashboard: Bulk Changes'
    })
})
app.get('/raw_tables', (req, res) => {
    res.render('raw_tables', {
        title: 'Account Level Dashboard: Site Settings Tables'
    })
})
app.get('/version_info', (req, res) => {
    res.render('version_info', {
        title: 'Account Level Dashboard: Version Control'
    })
})
app.get('/debugging', (req, res) => {
    res.render('debugging', {
        title: 'Account Level Dashboard: Debugging'
    })
})


// ENDPOINTS FOR APIs
app.post('/dashboard_scripts', (req, res) => {
    // ADD CONDITION TO CHECK IF MISSING INPUTS CHECK
    //   sites_list.test((error, response) => {
    // sites_list.sites_list({api_id:req.api_id, api_key:req.api_key, account_id: req.account_id}, (error, response) => {

    sites_list.sites_list(req.body, (error, response) => {
        if (error) {
            return res.send({ error })
        }
        res.send(response)
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' there is no address'
        })
    }
    return res.send({
        address: req.query.address
    })
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})