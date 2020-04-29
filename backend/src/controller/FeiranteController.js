const crypto = require ('crypto')
const connection = require ('../database/connection')

module.exports = {

    async index (request, response){
        const feirantes = await connection('feirantes').select('*')
        
        return response.json(feirantes)
    },

    async create (request, response){
        const { nome, produtos, email, whatsapp, bairro, cidade, uf } = request.body

    const id = crypto.randomBytes(4).toString('HEX')

    await connection('feirantes').insert({
        id,
        nome,
        produtos,
        email,
        whatsapp,
        bairro,
        cidade,
        uf,
    })

    return response.json({ id })
    }
}