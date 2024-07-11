import Validator from "../../../utilitarios/validator.js";
import CursoRepository from "../repository/postgres/index.js";
import express from "express";
const app = express();
app.use(express.json());
const cursoRepository = new CursoRepository();

class Controller {

    getAll = async (req, res) => {
        try {
            const cursoObj = await cursoRepository.buscarTodos()
            res.status(200).json(cursoObj);
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const cursoObj = await cursoRepository.buscar(id);

            if (!cursoObj) {
                res.status(422).json({ msg: "Curso não cadastrado." })
            } else {
                res.status(200).json(cursoObj);
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
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }
            const cursoObj = {
                nome: req.body.nome,
                ativo: req.body.ativo
            }

            await cursoRepository.salvar(cursoObj.nome, cursoObj.ativo)

            if (!cursoObj) {
                res.status(422).json({ msg: "Erro ao cadastrar o curso." })
            } else {
                res.status(201).json({ msg: "Curso cadastrado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const cursoAtual = await cursoRepository.buscar(id)

            if (!cursoAtual) {
                res.status(422).json({ msg: "Curso não cadastrado." })
            }

            const { nome, ativo } = req.body

            await cursoRepository.atualizar(cursoAtual.id, nome, ativo);
            res.status(200).json({ msg: "Curso atualizado com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const cursoAtual = await cursoRepository.buscar(id)

            if (!cursoAtual) {
                res.status(422).json({ msg: "Erro ao deletar o curso." })
            } else {
                await cursoRepository.deletar(cursoAtual.id);
                res.status(200).json({ msg: "Curso deletado com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;