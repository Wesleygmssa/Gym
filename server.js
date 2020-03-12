const express = require('express');
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')// usar função put

const server = express()

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true})) //=>  dados enviado pelo formulario em post
server.set('view engine', 'njk')
server.use(methodOverride('_method')) //put //delete
server.use(routes) //-> função middllewares


nunjucks.configure('views',{
    express:server,
    autoescape: false,
    noCahe: true
})

//servidor
server.listen(2000, function(){
    console.log('Server is running')
})