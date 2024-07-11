import PessoaRepository from "../../pessoa-api/repository/postgres/index.js";
import ProfessorRepository from "../repository/postgres/index.js";
import Validator from "../../../utilitarios/validator.js";
import express from "express";
const app = express();
app.use(express.json());
const pessoaRepository = new PessoaRepository();
const professorRepository = new ProfessorRepository();

class Controller {

    getAll = async (req, res) => {
        try {
            const professoresObj = await professorRepository.buscarTodos()
            res.status(200).json(professoresObj);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const professorObj = await professorRepository.buscar(id);

            if (!professorObj) {
                res.status(422).json({ msg: "Professor não cadastrado." })
            } else {
                res.status(200).json(professorObj)
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

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
                res.status(422).json({ msg: "Erro ao cadastrar o professor." })
            } else {
                const salario = req.body.salario
                await professorRepository.salvar(salario, pessoaObj.id)
                res.status(201).json({ msg: "Professor cadastrado com sucesso!" })
            }

        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const professorAtual = await professorRepository.buscar(id)

            if (!professorAtual) {
                res.status(500).json({ msg: "Professor não encontrado." })
            } else {
                const idPessoa = professorAtual.id_pessoa
                await pessoaRepository.atualizar(idPessoa, req.body)

                const salario = req.body.salario
                await professorRepository.atualizar(salario, id)
                res.status(200).json({ msg: "Professor atualizado com sucesso!" })
            }


        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const pessoaAtual = await professorRepository.buscar(id)

            if (!pessoaAtual) {
                res.status(500).send({ msg: "Professor não encontrado." })
            } else {
                await professorRepository.deletar(pessoaAtual.id_pessoa);

                res.set("Content-type", "application/json")
                res.status(200).send({})
            }

        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}

export default Controller