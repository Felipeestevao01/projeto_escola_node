import PessoaRepository from "../../pessoa/repository/postgres/index.js";
import AlunoRepository from "../repository/postgres/index.js"
import express from "express";
const app = express();
app.use(express.json());
const alunoRepository = new AlunoRepository();
const pessoaRepository = new PessoaRepository();


class Controller {


    getAll = async (req, res) => {
        try {
            const alunosObj = await alunoRepository.buscarTodos()
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
            const alunoObj = await alunoRepository.buscar(id)
            const aluno = JSON.stringify(alunoObj);
            res.set("Content-type", "application/json")
            res.status(200).send(aluno);
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {
            const nome = req.body.nome
            const sobrenome = req.body.sobrenome
            const telefone = req.body.telefone
            const cpf = req.body.cpf
            const endereco = req.body.endereco
            const email = req.body.email
            const dataAniversario = req.body.dataAniversario
            const pessoaObj = await pessoaRepository.salvar(nome, sobrenome, telefone, cpf, endereco, email, dataAniversario)

            if (!pessoaObj.id) {
                res.status(500).send({ msg: "Erro ao cadastrar a pessoa." })
            }
            const numeroFaltas = req.body.numeroFaltas
            await alunoRepository.salvar(numeroFaltas, pessoaObj.id)


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
            const alunoAtual = await alunoRepository.buscar(id)

            if (!alunoAtual) {
                res.status(500).send({ msg: "Aluno não cadastrado." })
            }
            const idPessoa = alunoAtual.id_pessoa
            const nome = req.body.nome
            const sobrenome = req.body.sobrenome
            const telefone = req.body.telefone
            const cpf = req.body.cpf
            const endereco = req.body.endereco
            const email = req.body.email
            const dataAniversario = req.body.data_aniversario
            await pessoaRepository.atualizar(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario);

            const numeroFaltas = req.body.numeroFaltas
            await alunoRepository.atualizar(numeroFaltas, id)

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