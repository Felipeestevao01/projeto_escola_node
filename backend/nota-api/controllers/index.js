import NotaRepository from "../repository/postgres/index.js";
import Validator from "../../../utilitarios/validator.js";
import express from "express";
const app = express();
app.use(express.json());
const notaRepository = new NotaRepository();

class Controller {
    getAll = async (req, res) => {
        try {
            const notaObj = await notaRepository.buscarTodos()
            res.status(200).json(notaObj);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }


    get = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const notaObj = await notaRepository.buscar(id);

            if (!notaObj) {
                res.status(422).json({ msg: "Nota não cadastrada." })
            } else {
                res.status(200).json(notaObj)
            }
        }
        catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }

    create = async (req, res) => {
        try {
            const regras = [
                { field: 'valor_nota', validations: ['required'] },
            ];
            const validator = new Validator(req.body, regras);
            if (!validator.validate()) {
                return res.status(400).json({ errors: validator.getErrors() });
            }

            const notaObj = {
                valorNota: req.body.valor_nota,
                idTrabalho: req.body.id_trabalho,
                idAluno: req.body.id_aluno
            }
            await notaRepository.salvar(notaObj.valorNota, notaObj.idTrabalho, notaObj.idAluno)
            res.status(201).json({ msg: "Nota cadastrada com sucesso!" })
        }
        catch (error) {
            res.status(500).send({ msg: error.message });
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
            res.status(200).json({ msg: "Nota atualizada com sucesso!" })


        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }

    delete = async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const notaAtual = await notaRepository.buscar(id)

            if (!notaAtual) {
                res.status(500).send({ msg: "Nota não encontrada." })
            } else {
                await notaRepository.deletar(id);

                res.set("Content-type", "application/json")
                res.status(200).send({})
            }

        }
        catch (error) {
            res.status(500).send({ msg: error.message });
        }
    }
}

export default Controller;
