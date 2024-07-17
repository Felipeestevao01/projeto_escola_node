import Validator from "../../../utilitarios/validator.js";
import MateriaRepository from "../repository/postgres/index.js";
import ProfessorRepository from "../../professor-api/repository/postgres/index.js";
const materiaRepository = new MateriaRepository();
const professorRepository = new ProfessorRepository();
import express from "express";
const app = express();
app.use(express.json());

class Controller {

    getAll = async (req, res) => {
        try {
            const listaMateriasObj = await materiaRepository.buscarTodos()
            return res.status(200).json(listaMateriasObj);
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const materiaObj = await materiaRepository.buscar(id);
            if (!materiaObj) {
                return res.status(422).json({ msg: "Materia não cadastrada." })
            }
            return res.status(200).json(materiaObj);
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    };

    create = async (req, res) => {
        try {

            const regras = [
                { field: 'descricao', validations: ['required', 'min:3'] },
                { field: 'cargaHoraria', validations: ['required'] },
                {
                    field: 'idProfessor', validations: ['required', {
                        model: professorRepository,
                        validator: ['exist']
                    }]
                }
            ];
            const validator = new Validator(req.body, regras);
            if (await validator.validate() === false) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const materiaObj = {
                descricao: req.body.descricao,
                cargaHoraria: req.body.cargaHoraria,
                idProfessor: req.body.idProfessor
            };
            await materiaRepository.salvar(materiaObj.descricao, materiaObj.cargaHoraria, materiaObj.idProfessor);

            if (!materiaObj) {
                return res.status(422).json({ msg: "Erro ao cadastrar a materia." });
            }
            return res.status(201).json({ msg: "Materia cadastrada com sucesso!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const materiaAtual = await materiaRepository.buscar(id)

            if (!materiaAtual) {
                return res.status(422).json({ msg: "Materia não cadastrada." })
            }

            const materiaAtualizada = {
                descricao: req.body.descricao,
                cargaHoraria: req.body.cargaHoraria,
                idProfessor: req.body.idProfessor
            };

            const professorAtual = await professorRepository.buscar(materiaAtualizada.idProfessor)

            if (!professorAtual) {
                return res.status(422).json({ msg: "Professor não cadastrado." })
            }

            await materiaRepository.atualizar(materiaAtual.id, materiaAtualizada.descricao, materiaAtualizada.cargaHoraria, materiaAtualizada.idProfessor);
            return res.status(200).json({ msg: "Materia atualizada com sucesso!" });

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const materiaAtual = await materiaRepository.buscar(id);
            if (!materiaAtual) {
                return res.status(422).json({ msg: "Erro ao deletar a materia." });
            }
            await materiaRepository.deletar(materiaAtual.id);
            return res.status(200).json({ msg: "Materia deletada com sucesso!" });

        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    };
}

export default Controller;