import PessoaRepository from "../../pessoa/repository/postgres/index.js";
import ProfessorRepository from "../repository/postgres/index.js";
import express from "express";
const app = express();
app.use(express.json());
const pessoaRepository = new PessoaRepository();
const professorRepository = new ProfessorRepository();


class Controller {

    getAll = async (req, res) => {
        try {
            const professoresObj = await professorRepository.buscarTodos()
            const listaProfessores = JSON.stringify(professoresObj)

            res.set("Content-type", "application/json")
            res.status(200).send(listaProfessores);
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const professorObj = await professorRepository.buscar(id);

            if (!professorObj) {
                res.status(500).send({ msg: "Professor não cadastrado." })
            } else {
                const professor = JSON.stringify(professorObj)
                res.set("Content-type", "application/json")
                res.status(200).send(professor)
            }

        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const pessoaObj = await pessoaRepository.salvar(req.body)

            if (!pessoaObj.id) {
                res.status(500).send({ msg: "Erro ao cadastrar o professor." })
            }

            const salario = req.body.salario
            await professorRepository.salvar(salario, pessoaObj.id)
            res.set("Content-type", "application/json")
            res.status(200).send({ msg: "Professor cadastrado com sucesso!" })
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
                res.status(500).send({ msg: "Professor não cadastrado." })
            }

            const idPessoa = professorAtual.id_pessoa
            await pessoaRepository.atualizar(idPessoa, req.body)

            const salario = req.body.salario
            await professorRepository.atualizar(salario, id)

            res.set("Content-type", "application/json")
            res.status(200).send({ msg: "Professor atualizado com sucesso!" })
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    delete = async (req, res) => {
        try {

        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}

export default Controller