import Model from "../models/AlunoModel.js";
const alunoModel = new Model();


class Controller {

    get = async (req, res) => {
        try {
            const id = req.params.id;
            const aluno = alunoModel.buscarAluno(id);
            const alunoJson = JSON.stringify(aluno);
            res.status(200).send(alunoJson);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    index = async (req, res) => {
        try {
            const listaAlunos = alunoModel.buscarAlunos()
            const alunosJson = JSON.stringify(listaAlunos);
            res.status(200).send(alunosJson);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    store = async (req, res) => {
        try {
            const id = req.params.id
            const aluno = alunoModel.criarAluno(id)
            res.status(200).send(aluno);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = req.params.id;
            const aluno = alunoModel.atualizarAluno(id);
            const alunoJson = JSON.stringify(aluno);
            res.status(200).send(alunoJson);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = req.params.id;
            const aluno = alunoModel.deletarAluno(id);
            const alunoJson = JSON.stringify(aluno);
            res.status(200).send(alunoJson);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };
}

export default Controller;