import Validator from "../../../utilitarios/validator.js";
import QuestaoRepository from "../repository/postgres/index.js";
import express from "express";
const app = express();
app.use(express.json());
const questaoRepository = new QuestaoRepository();

class Controller {

    getAll = async (req, res) => {
        try {
            const questaoObj = await questaoRepository.buscarTodos()
            res.status(200).json(questaoObj);
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const questaoObj = await questaoRepository.buscar(id);

            if (!questaoObj) {
                res.status(422).json({ msg: "Questão não cadastrada." })
            } else {
                res.status(200).json(questaoObj);
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
                { field: 'escolhas', validations: ['required', 'min:4'] }
            ];
            const validator = new Validator(req.body, regras);
            if (!await validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }
            const questaoObj = {
                descricao: req.body.descricao,
                escolhas: req.body.escolhas
            }

            await questaoRepository.salvar(questaoObj.descricao, questaoObj.escolhas)

            if (!questaoObj) {
                res.status(422).json({ msg: "Erro ao cadastrar a questão." })
            } else {
                res.status(201).json({ msg: "Questão cadastrada com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const questaoAtual = await questaoRepository.buscar(id)

            if (!questaoAtual) {
                res.status(422).json({ msg: "Questão não cadastrada." })
            }

            const questaoAtualizada = {
                descricao: req.body.descricao,
                escolhas: req.body.escolhas
            }

            await questaoRepository.atualizar(questaoAtual.id, questaoAtualizada.descricao, questaoAtualizada.escolhas);
            res.status(200).json({ msg: "Questão atualizada com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const questaoAtual = await questaoRepository.buscar(id)

            if (!questaoAtual) {
                res.status(422).json({ msg: "Erro ao deletar a questão." })
            } else {
                await questaoRepository.deletar(questaoAtual.id);
                res.status(200).json({ msg: "Questão deletada com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };


}

export default Controller;