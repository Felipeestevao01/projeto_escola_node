import Validator from "../../../utilitarios/validator.js";
import NotaRepository from "../repository/postgres/index.js";
const notaRepository = new NotaRepository();
import express from "express";
const app = express();
app.use(express.json());

class Controller {

    getAll = async (req, res) => {
        try {
            const listaNotasObj = await notaRepository.buscarTodos()
            return res.status(200).json(listaNotasObj);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const notaObj = await notaRepository.buscar(id);
            if (!notaObj) {
                return res.status(422).json({ msg: "Nota não cadastrada." })
            }
            return res.status(200).json(notaObj)

        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const regras = [
                { field: 'valorNota', validations: ['required'] },
                { field: 'idTrabalho', validations: ['required'] },
                { field: 'idAluno', validations: ['required'] },
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const notaObj = {
                valorNota: req.body.valorNota,
                idTrabalho: req.body.idTrabalho,
                idAluno: req.body.idAluno
            }
            await notaRepository.salvar(notaObj.valorNota, notaObj.idTrabalho, notaObj.idAluno)
            return res.status(201).json({ msg: "Nota cadastrada com sucesso!" })
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    update = async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const notaAtual = await notaRepository.buscar(id)
            if (!notaAtual) {
                return res.status(500).json({ msg: "Nota não encontrada." })
            }

            const notaAtualizada = {
                valorNota: req.body.valor_nota,
                idTrabalho: req.body.id_trabalho,
                idAluno: req.body.id_aluno
            }
            await notaRepository.atualizar(notaAtual.id, notaAtualizada.valorNota, notaAtualizada.idTrabalho, notaAtualizada.idAluno)
            return res.status(200).json({ msg: "Nota atualizada com sucesso!" })
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const notaAtual = await notaRepository.buscar(id)
            if (!notaAtual) {
                return res.status(500).json({ msg: "Nota não encontrada." })
            }

            await notaRepository.deletar(notaAtual.id);
            return res.status(200).json({})
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default Controller;
