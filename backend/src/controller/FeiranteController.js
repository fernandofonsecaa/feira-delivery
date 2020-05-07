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
    },

    async delete (request, response){
        const { id } = request.params

        // const incident = await connection('feirantes')
        // .where('id',id)
        // .first()
        await connection ('feirantes').where('id',id).delete()

        return response.status (204).send()
    },

    async indexFiltered (request, response){
        const { cidade } = request.params
        // const feirantes = await connection ('feirantes').where('cidade', cidade) *sem tratar Lower e uppercase
        const feirantes = await connection ('feirantes').whereRaw("LOWER(cidade) LIKE '%' || LOWER(?) || '%'", cidade)        
        return response.json (feirantes)
    }
}