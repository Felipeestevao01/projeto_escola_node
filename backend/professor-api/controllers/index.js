import Validator from "../../../utilitarios/validator.js";
import PessoaRepository from "../../pessoa-api/repository/postgres/index.js";
import ProfessorRepository from "../repository/postgres/index.js";
const pessoaRepository = new PessoaRepository();
const professorRepository = new ProfessorRepository();
import express from "express";
const app = express();
app.use(express.json());

class Controller {

    getAll = async (req, res) => {
        try {
            const listaProfessoresObj = await professorRepository.buscarTodos();
            return res.status(200).json(listaProfessoresObj);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const professorObj = await professorRepository.buscar(id);

            if (!professorObj) {
                return res.status(422).json({ msg: "Professor não cadastrado." });
            }
            return res.status(200).json(professorObj);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const regras = [
                { field: 'nome', validations: ['required', 'min:3'] },
                { field: 'sobrenome', validations: ['required', 'min:3'] },
                { field: 'salario', validations: ['required'] }
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const pessoaObj = await pessoaRepository.salvar(req.body);
            if (!pessoaObj.id) {
                return res.status(422).json({ msg: "Erro ao cadastrar o professor." });
            }

            const salario = req.body.salario;
            await professorRepository.salvar(pessoaObj.id, salario);
            return res.status(201).json({ msg: "Professor cadastrado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const professorObj = await professorRepository.buscar(id);

            if (!professorObj) {
                return res.status(500).json({ msg: "Professor não encontrado." });
            }
            await pessoaRepository.atualizar(professorObj.id_pessoa, req.body);

            const salario = req.body.salario;
            await professorRepository.atualizar(id, salario);
            return res.status(200).json({ msg: "Professor atualizado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const professorObj = await professorRepository.buscar(id);
            if (!professorObj) {
                return res.status(500).json({ msg: "Professor não encontrado." });
            }

            await professorRepository.deletar(professorObj.id_pessoa);
            return res.status(200).json({ msg: "Professor deletado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default Controller;