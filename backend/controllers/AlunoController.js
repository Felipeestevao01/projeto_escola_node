import Model from "../models/AlunoModel.js";
const alunoModel = new Model();


class Controller {

    get = async (req, res) => {
        try {
            const id = req.params.id
            const aluno = alunoModel.buscarAluno(id)
            const alunoJson = JSON.stringify(aluno);
            res.status(200).send(alunoJson);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    getAll = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).send(id);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    create = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).send(id);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).send(id);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = req.params.id
            res.status(200).send(id);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };
}

export default Controller;