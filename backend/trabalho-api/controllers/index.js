import Validator from "../../../utilitarios/validator.js";
import TrabalhoRepository from "../repository/postgres/index.js";
const trabalhoRepository = new TrabalhoRepository();
import express from "express";
const app = express();
app.use(express.json());

class Controller {
    getAll = async (req, res) => {
        try {
            const listaTrabalhosObj = await trabalhoRepository.buscarTodos()
            return res.status(200).json(listaTrabalhosObj);
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const trabalhoObj = await trabalhoRepository.buscar(id);
            if (!trabalhoObj) {
                return res.status(422).json({ msg: "Trabalho não cadastrado." })
            }
            return res.status(200).json(trabalhoObj);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {

            const regras = [
                { field: 'descricao', validations: ['required'] },
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const trabalhoObj = {
                descricao: req.body.descricao,
                dataTrabalho: req.body.dataTrabalho,
                idProfessor: req.body.idProfessor
            }
            await trabalhoRepository.salvar(trabalhoObj.descricao, trabalhoObj.dataTrabalho, trabalhoObj.idProfessor);

            if (!trabalhoObj) {
                return res.status(422).json({ msg: "Erro ao cadastrar o trabalho." })
            }
            return res.status(201).json({ msg: "Trabalho cadastrado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const trabalhoAtual = await trabalhoRepository.buscar(id)
            if (!trabalhoAtual) {
                return res.status(422).json({ msg: "Trabalho não cadastrado." })
            }

            const trabalhoAtualizado = {
                descricao: req.body.descricao,
                dataTrabalho: req.body.dataTrabalho,
                idProfessor: req.body.idProfessor
            }
            await trabalhoRepository.atualizar(trabalhoAtual.id, trabalhoAtualizado.descricao, trabalhoAtualizado.dataTrabalho, trabalhoAtualizado.idProfessor);
            return res.status(200).json({ msg: "Trabalho atualizado com sucesso!" });

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const trabalhoAtual = await trabalhoRepository.buscar(id)
            if (!trabalhoAtual) {
                return res.status(422).json({ msg: "Erro ao deletar o trabalho." })
            }

            await trabalhoRepository.deletar(trabalhoAtual.id);
            return res.status(200).json({ msg: "Trabalho deletado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller