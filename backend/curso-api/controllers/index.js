import Validator from "../../../utilitarios/validator.js";
import CursoRepository from "../repository/postgres/index.js";
const cursoRepository = new CursoRepository();
import express from "express";
const app = express();
app.use(express.json());

class Controller {

    getAll = async (req, res) => {
        try {
            const listaCursosObj = await cursoRepository.buscarTodos()
            return res.status(200).json(listaCursosObj);
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const cursoObj = await cursoRepository.buscar(id);
            if (!cursoObj) {
                return res.status(422).json({ msg: "Curso não cadastrado." });
            }

            return res.status(200).json(cursoObj);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {

            const regras = [
                { field: 'nome', validations: ['required', 'min:3'] },
                { field: 'ativo', validations: ['required'] }
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const cursoObj = {
                nome: req.body.nome,
                ativo: req.body.ativo
            };
            await cursoRepository.salvar(cursoObj.nome, cursoObj.ativo);

            if (!cursoObj) {
                return res.status(422).json({ msg: "Erro ao cadastrar o curso." })
            }
            return res.status(201).json({ msg: "Curso cadastrado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const cursoAtual = await cursoRepository.buscar(id)

            if (!cursoAtual) {
                return res.status(422).json({ msg: "Curso não cadastrado." })
            }

            const cursoAtualizado = {
                nome: req.body.nome,
                ativo: req.body.ativo
            }
            await cursoRepository.atualizar(cursoAtual.id, cursoAtualizado.nome, cursoAtualizado.ativo);

            return res.status(200).json({ msg: "Curso atualizado com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const cursoAtual = await cursoRepository.buscar(id)

            if (!cursoAtual) {
                return res.status(422).json({ msg: "Erro ao deletar o curso." })
            }
            await cursoRepository.deletar(id);
            return res.status(200).json({ msg: "Curso deletado com sucesso!" });

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;