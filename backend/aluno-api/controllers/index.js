import Validator from "../../../utilitarios/validator.js";
import PessoaRepository from "../../pessoa-api/repository/postgres/index.js";
import AlunoRepository from "../repository/postgres/index.js"
import express from "express";
const app = express();
app.use(express.json());
const alunoRepository = new AlunoRepository();
const pessoaRepository = new PessoaRepository();

class Controller {

    getAll = async (req, res) => {
        try {
            const alunosObj = await alunoRepository.buscarTodos();
            res.status(200).json(alunosObj);
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    };

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const alunoObj = await alunoRepository.buscar(id);

            if (!alunoObj) {
                res.status(422).json({ msg: "Aluno não cadastrado." })
            } else {
                res.status(200).json(alunoObj);
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
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
                res.status(422).json({ msg: "Erro ao cadastrar o aluno." })
            } else {
                const numeroFalta = req.body.numeroFaltas
                await alunoRepository.salvar(numeroFalta, pessoaObj.id)

                res.status(201).json({ msg: "Aluno cadastrado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const alunoAtual = await alunoRepository.buscar(id)

            if (!alunoAtual) {
                res.status(422).json({ msg: "Aluno não cadastrado." })
            } else {
                const idPessoa = alunoAtual.id_pessoa;
                await pessoaRepository.atualizar(idPessoa, req.body);

                const numeroFaltas = req.body.numeroFaltas;
                await alunoRepository.atualizar(numeroFaltas, id);

                res.status(200).json({ msg: "Aluno atualizado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const pessoaAtual = await alunoRepository.buscar(id)

            if (!pessoaAtual) {
                res.status(422).json({ msg: "Erro ao deletar o aluno." })
            } else {
                await alunoRepository.deletar(pessoaAtual.id_pessoa);
                res.status(200).json({ msg: "Aluno deletado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;