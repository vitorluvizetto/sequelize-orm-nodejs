const database = require('../models');

class TurmaController {

    static async pegaTodasAsTurmas(request, response) {
        try {
            const todasAsTurmas = await database.Turmas.findAll();
            return response.status(200).json(todasAsTurmas);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    static async pegaUmaTurma(request, response) {
        const { id } = request.params
        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(umaTurma)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async criaTurma(request, response) {
        const novaTurma = request.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return response.status(200).json(novaTurmaCriada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async atualizaTurma(request, response) {
        const { id } = request.params
        const novasInfos = request.body
        try {
            await database.Turmas.update(novasInfos, { where: { id: Number(id) } })
            const turmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } })
            return response.status(200).json(turmaAtualizada)
        } catch (error) {
            return response.status(500).json(error.message)
        }
    }

    static async apagaTurma(request, response) {
        const { id } = request.params
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return response.status(200).json({ mensagem: `id ${id} deletado` })

        } catch (error) {
            return response.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController;