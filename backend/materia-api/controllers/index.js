import Validator from "../../../utilitarios/validator.js";
import MateriaRepository from "../repository/postgres/index.js";
import ProfessorRepository from "../../professor-api/repository/postgres/index.js";
import express from "express";
const app = express();
app.use(express.json());
const materiaRepository = new MateriaRepository();
const professorRepository = new ProfessorRepository();

class Controller {

    getAll = async (req, res) => {
        try {
            const materiaObj = await materiaRepository.buscarTodos()
            res.status(200).json(materiaObj);
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const materiaObj = await materiaRepository.buscar(id);

            if (!materiaObj) {
                return res.status(422).json({ msg: "Materia não cadastrada." })
            }
            res.status(200).json(materiaObj);
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {

            const regras = [
                { field: 'descricao', validations: ['required', 'min:3'] },
                { field: 'carga_horaria', validations: ['required'] },
                {
                    field: 'id_professor', validations: ['required', {
                        model: professorRepository,
                        validator: ['exist']
                    }]
                }
            ];
            const validator = new Validator(req.body, regras);
            if (await validator.validate() === false) {
                return res.status(400).json({ errors: validator.getErrors() });
            }
            const { descricao, carga_horaria, id_professor } = req.body
            const materiaObj = await materiaRepository.salvar(descricao, carga_horaria, id_professor)

            if (!materiaObj) {
                return res.status(422).json({ msg: "Erro ao cadastrar a materia." })
            }
            res.status(201).json({ msg: "Materia cadastrada com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const materiaAtual = await materiaRepository.buscar(id)

            if (!materiaAtual) {
                res.status(422).json({ msg: "Materia não cadastrada." })
            }

            const { descricao, carga_horaria, id_professor } = req.body

            const professorAtual = await professorRepository.buscar(id_professor)

            if (!professorAtual) {
                return res.status(422).json({ msg: "Professor não cadastrado." })
            }

            await materiaRepository.atualizar(materiaAtual.id, descricao, carga_horaria, id_professor);
            res.status(200).json({ msg: "Materia atualizada com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const materiaAtual = await materiaRepository.buscar(id)

            if (!materiaAtual) {
                return res.status(422).json({ msg: "Erro ao deletar a materia." })
            }
            await materiaRepository.deletar(materiaAtual.id);
            res.status(200).json({ msg: "Materia deletada com sucesso!" });

        }
        catch (error) {
            res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;