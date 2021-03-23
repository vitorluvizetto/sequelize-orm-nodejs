const database = require('../models');

class NivelController {

    static async pegaTodasOsNiveis(request, response) {
        try {
            const todasOsNiveis = await database.Niveis.findAll();
            return response.status(200).json(todasOsNiveis);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(request, response) {
        const { id } = request.params
        try {
            const umNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(umNivel)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async criaNivel(request, response) {
        const novoNivel = request.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return response.status(200).json(novoNivelCriado)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async atualizaNivel(request, response) {
        const { id } = request.params
        const novasInfos = request.body
        try {
            await database.Niveis.update(novasInfos, { where: { id: Number(id) } })
            const nivelAtualizado = await database.Niveis.findOne({ where: { id: Number(id) } })
            return response.status(200).json(nivelAtualizado)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async apagaNivel(request, response) {
        const { id } = request.params
        try {
            await database.Niveis.destroy({ where: { id: Number(id) } })
            return response.status(200).json({ mensagem: `id ${id} deletado` })

        } catch (error) {
            return response.status(500).json(error.message)
        }
    }
}

module.exports = NivelController;