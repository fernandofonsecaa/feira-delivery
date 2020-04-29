const express = require ('express')

const FeiranteController = require ('./controller/FeiranteController')
 
const routes = express.Router()

routes.get('/feirantes', FeiranteController.index)

routes.post('/feirantes', FeiranteController.create)



module.exports = routes