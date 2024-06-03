import Aluno from "../models/AlunoModel.js";
const alunoModel = new Aluno();


class Controller {


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

    store = async (req, res) => {
        try {
            const novoAluno = {
                id: req.params.id,
                nome: req.body.nome,
                email: req.body.email,
                idade: req.body.idade
            }

            const aluno = alunoModel.criarAluno(novoAluno)
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