import Validator from "../../../utilitarios/validator.js";
import MatriculaRepository from "../repository/postgres/index.js";
import express from "express";
const app = express();
app.use(express.json());
const matriculaRepository = new MatriculaRepository();

class Controller {

    getAll = async (req, res) => {
        try {
            const matriculaObj = await matriculaRepository.buscarTodos()
            res.status(200).json(matriculaObj);
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const matriculaObj = await matriculaRepository.buscar(id);

            if (!matriculaObj) {
                res.status(422).json({ msg: "Matricula não cadastrada." })
            } else {
                res.status(200).json(matriculaObj);
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
            const matriculaObj = {
                ativa: req.body.ativa,
                id_aluno: req.body.id_aluno,
                id_curso: req.body.id_curso
            }

            await matriculaRepository.salvar(matriculaObj.ativa, matriculaObj.id_aluno, matriculaObj.id_curso)

            if (!matriculaObj) {
                res.status(422).json({ msg: "Erro ao cadastrar a matricula." })
            } else {
                res.status(201).json({ msg: "Matricula cadastrada com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const matriculaAtual = await matriculaRepository.buscar(id)

            if (!matriculaAtual) {
                res.status(422).json({ msg: "Matricula não cadastrada." })
            }

            const ativa = req.body.ativa

            await matriculaRepository.atualizar(matriculaAtual.id, ativa);
            res.status(200).json({ msg: "Matricula atualizada com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const matriculaAtual = await matriculaRepository.buscar(id)

            if (!matriculaAtual) {
                res.status(422).json({ msg: "Erro ao deletar a matricula." })
            } else {
                await matriculaRepository.deletar(matriculaAtual.id);
                res.status(200).json({ msg: "Matricula deletada com sucesso!" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;