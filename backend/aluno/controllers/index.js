import Validator from "../../../utilitarios/validator.js";
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

            if (!alunoObj) {
                res.status(500).send({ msg: "Aluno não cadastrado." })
            } else {
                const aluno = JSON.stringify(alunoObj);
                res.set("Content-type", "application/json")
                res.status(200).send(aluno);
            }
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {

            const regras = [
                { field: 'nome', validations: ['required', 'min:3'] },
                { field: 'sobrenome', validations: ['required', 'min:3'] },
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const pessoaObj = await pessoaRepository.salvar(req.body)

            if (!pessoaObj.id) {
                res.status(500).send({ msg: "Erro ao cadastrar o aluno." })
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
            await pessoaRepository.atualizar(idPessoa, req.body);

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
            const pessoaAtual = await alunoRepository.buscar(id)

            if (pessoaAtual.dt_deleted != null) {
                res.status(500).send({ msg: "Erro ao deletar o aluno." })
            }

            await alunoRepository.deletar(pessoaAtual.id_pessoa);
            res.status(200).send({});
        }
        catch (error) {
            res.status(500).send({ msg: error.message })
        }
    };
}

export default Controller;