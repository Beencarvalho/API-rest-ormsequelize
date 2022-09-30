const database = require('../models')

class TurmaController {
    //Buscar todos os registros
    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        } //try catch para capturar um erro
    }
    //Buscar um registro especifico por id
    static async pegaUmaTurma(req, res) {
        const { id } = req.params
        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            }) //encontrar 1 registro
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Criar um registro
    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //atualizar um registro
    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } })
            const TurmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(TurmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //deletar um registro
    static async apagaTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController