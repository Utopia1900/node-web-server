const express = require('express')
const fs = require('fs')
const hbs = require('hbs')
const app = express()

const port = process.env.port || 3000
app.set('view engine', 'hbs')
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next();
})
/*app.use((req, res, next) => {
    res.render('maintenance.hbs')
    next()
})*/
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send(`<h1>Hello Express</h1>`)
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my websites.'
    })
})

app.get('/about', (req, res) => {
    // res.send('About Page')
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle requests.'
    })
})

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase()
})

app.listen(3000, () => {
    console.log(`Server is running on port ${port}.`)
})


