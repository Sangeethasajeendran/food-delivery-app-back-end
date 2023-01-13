//import express
const express = require('express')

//import data service app
const dataService = require('./services/data.service')

const cors = require('cors')


//2.create a server app  using express
const app = express()

//to parse json data
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:4200'
}))

//3.set port for server app
app.listen(3000, () => {
    console.log('server started at port 3000');
})



app.post('/login', (req, res) => {
    console.log('inside login function');
    console.log(req.body);
    dataService.login(req.body.username, req.body.password).then((result) => {
        res.status(result.statusCode).json(result)
    })

})

app.get('/all-rest', (req, res) => {
    console.log('inside menu');
    dataService.getRest()
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})
app.get('/all-rest/:id', (req, res) => {
    console.log('inside nu');
    dataService.getRest(req.params.id)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/signup', (req, res) => {
    console.log('inside register function');
    console.log(req.body);
    // asynchronous
    dataService.signup(req.body.username, req.body.password)
        .then((result) => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/add-to-cart', (req, res) => {
    console.log('inside addToCart function');
    console.log(req.body);
    dataService.addToCart(req.body.id, req.body.name, req.body.price, req.body.restname).then((result) => {
        res.status(result.statusCode).json(result)
    })
})

// getcart APi
app.get('/get-cart', (req, res) => {
    console.log('inside cart function');
    console.log(req.body);
    dataService.getCart().then((result) => {
        res.status(result.statusCode).json(result)
    })
})

//delete-item-cart
app.delete('/delete-cart/:id', (req, res) => {
    console.log('inside cart function');
    dataService.deleteItemCart(req.params.id)
    .then((result) => {
        res.status(result.statusCode).json(result)
    })
})

app.delete('/delete-cart', (req, res) => {
    console.log('inside cart function');
    dataService.deleteCart()
    .then((result) => {
        res.status(result.statusCode).json(result)
    })
})