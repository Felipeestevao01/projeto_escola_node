import AlunoRepository from "../repository/postgres/index.js"
import express from "express";
const app = express();
app.use(express.json());
const alunoRepository = new AlunoRepository();


class Controller {

    getAll = async (req, res) => {
        try {
            const alunosObj = alunoRepository.buscarTodos()
            const listaAlunos = JSON.stringify(alunosObj);
            
            res.set("Content-type", "application/json")
            res.status(200).send(listaAlunos);
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    };

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const aluno = JSON.stringify(alunoRepository.buscar(id));
            res.set("Content-type", "application/json")
            res.status(200).send(aluno);
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const id = parseInt(req.body.id)
            const nome = req.body.nome
            const sobrenome = req.body.sobrenome
            const telefone = req.body.telefone
            const cpf = req.body.cpf
            const endereco = req.body.endereco
            const email = req.body.email
            const dataAniversario = req.body.dataAniversario
            const numeroFaltas = req.body.numeroFaltas
            JSON.stringify(alunoRepository.salvar(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas))
            res.set("Content-type", "application/json")
            res.status(200).send("Aluno cadastrado com sucesso!");
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const nome = req.body.nome
            const sobrenome = req.body.sobrenome
            const telefone = req.body.telefone
            const cpf = req.body.cpf
            const endereco = req.body.endereco
            const email = req.body.email
            const idade = req.body.idade
            JSON.stringify(alunoRepository.atualizar(id, nome, sobrenome, telefone, cpf, endereco, email, idade));
            res.status(200).send("Aluno atualizado com sucesso!");
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const aluno = alunoRepository.deletar(id);
            const alunoJson = JSON.stringify(aluno);
            res.set("Content-type", "application/json")
            res.status(200).send(alunoJson);
        }
        catch (error) {
            res.status(500).send({ msg: e.message })
        }
    };
}

export default Controller;