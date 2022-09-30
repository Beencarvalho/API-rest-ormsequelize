const database = require('../models')

class NiveisController {
    //Buscar todos os registros
    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        } //try catch para capturar um erro
    }
    //Buscar um registro especifico por id
    static async pegaUmNivel(req, res) {
        const { id } = req.params
        try {
            const umNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            }) //encontrar 1 registro
            return res.status(200).json(umNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Criar um registro
    static async criaNivel(req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //atualizar um registro
    static async atualizaNivel(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Niveis.update(novasInfos, { where: { id: Number(id) } })
            const NivelAtualizado = await database.Niveis.findOne({ where: { id: Number(id) } })
            return res.status(200).json(NivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //deletar um registro
    static async apagaNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NiveisController