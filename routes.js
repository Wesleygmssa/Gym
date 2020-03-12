const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')//(instructors.js) funções auxiliares


{       //rotas de renderização

    routes.get('/', function (req, res) { 
        return res.redirect('/instructors')
    })

    routes.get('/instructors', function (req, res) { 
        return res.render('instructors/create')
    })

    routes.get('/instructors/create', function (req, res) {
        return res.render('instructors/create')
    })

    routes.get('/members', function (req, res) {
        return res.send('members')
    })

    {       // rotas com funções externa
        routes.post('/instructors', instructors.post) // pegando e salvando dados do form no data.js

        routes.put("/instructors", instructors.put) // atualizando

        routes.get('/instructors/:id', instructors.show) // exibindo dados do JSON 

        routes.get('/instructors/:id/edit', instructors.edit)// Exibindo pagina editar
    }

}


{//informações HTTPS
    //GET => pegar, receber, RESOURCE
    //POST => Criar , salvar dados, Criar um novo RESOURCE
    //PUT => Atualizar, RESOURCE
    //DETELE =>

}

module.exports = routes