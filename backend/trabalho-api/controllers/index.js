import Validator from "../../../utilitarios/validator.js";
import TrabalhoRepository from "../repository/postgres/index.js";
import express from "express";
const app = express();
app.use(express.json());
const trabalhoRepository = new TrabalhoRepository();

class Controller {
    getAll = async (req, res) => {
        try {
            const trabalhoObj = await trabalhoRepository.buscarTodos()
            res.status(200).json(trabalhoObj);
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const trabalhoObj = await trabalhoRepository.buscar(id);

            if (!trabalhoObj) {
                res.status(422).json({ msg: "Trabalho não cadastrado." })
            } else {
                res.status(200).json(trabalhoObj);
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
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
                data_trabalho: req.body.data_trabalho,
                id_professor: req.body.id_professor
            }

            await trabalhoRepository.salvar(trabalhoObj.descricao, trabalhoObj.data_trabalho, trabalhoObj.id_professor)

            if (!trabalhoObj) {
                res.status(422).json({ msg: "Erro ao cadastrar o trabalho." })
            } else {
                res.status(201).json({ msg: "Trabalho cadastrado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const trabalhoAtual = await trabalhoRepository.buscar(id)

            if (!trabalhoAtual) {
                res.status(422).json({ msg: "Trabalho não cadastrado." })
            }

            const trabalhoAtualizado = {
                descricao: req.body.descricao,
                data_trabalho: req.body.data_trabalho,
                id_professor: req.body.id_professor
            }

            await trabalhoRepository.atualizar(trabalhoAtual.id, trabalhoAtualizado.descricao, trabalhoAtualizado.data_trabalho, trabalhoAtualizado.id_professor);
            res.status(200).json({ msg: "Trabalho atualizado com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const trabalhoAtual = await trabalhoRepository.buscar(id)

            if (!trabalhoAtual) {
                res.status(422).json({ msg: "Erro ao deletar o trabalho." })
            } else {
                await trabalhoRepository.deletar(trabalhoAtual.id);
                res.status(200).json({ msg: "Trabalho deletado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller