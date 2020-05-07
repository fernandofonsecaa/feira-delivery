const express = require ('express')

const FeiranteController = require ('./controller/FeiranteController')
 
const routes = express.Router()

routes.get ('/feirantes/:cidade', FeiranteController.indexFiltered)

routes.get('/feirantes', FeiranteController.index)

routes.post('/feirantes', FeiranteController.create)

routes.delete('/feirantes/:id', FeiranteController.delete) 



module.exports = routes