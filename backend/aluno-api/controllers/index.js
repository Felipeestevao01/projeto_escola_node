import Validator from "../../../utilitarios/validator.js";
import PessoaRepository from "../../pessoa-api/repository/postgres/index.js";
import AlunoRepository from "../repository/postgres/index.js";
const pessoaRepository = new PessoaRepository();
const alunoRepository = new AlunoRepository();
import express from "express";
const app = express();
app.use(express.json());

class Controller {

    getAll = async (req, res) => {
        try {
            const listaAlunosObj = await alunoRepository.buscarTodos();
            return res.status(200).json(listaAlunosObj);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    };

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const alunoObj = await alunoRepository.buscar(id);

            if (!alunoObj) {
                return res.status(422).json({ msg: "Aluno não cadastrado." });
            }
            return res.status(200).json(alunoObj);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
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

            const pessoaObj = await pessoaRepository.salvar(req.body);

            if (!pessoaObj.id) {
                return res.status(422).json({ msg: "Erro ao cadastrar o aluno." });
            }
            const numeroFalta = req.body.numeroFaltas
            await alunoRepository.salvar(numeroFalta, pessoaObj.id)
            return res.status(201).json({ msg: "Aluno cadastrado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const alunoAtual = await alunoRepository.buscar(id);

            if (!alunoAtual) {
                return res.status(422).json({ msg: "Aluno não cadastrado." });
            }
            await pessoaRepository.atualizar(alunoAtual.id_pessoa, req.body);

            const numeroFaltas = parseInt(req.body.numeroFaltas);
            await alunoRepository.atualizar(numeroFaltas, id);
            return res.status(200).json({ msg: "Aluno atualizado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const pessoaAtual = await alunoRepository.buscar(id);

            if (!pessoaAtual) {
                return res.status(422).json({ msg: "Erro ao deletar o aluno." });
            }
            await alunoRepository.deletar(pessoaAtual.id_pessoa);
            return res.status(200).json({ msg: "Aluno deletado com sucesso!" });

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;