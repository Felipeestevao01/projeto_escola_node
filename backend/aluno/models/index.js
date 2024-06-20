import alunos from '../../../bd.js';
import Conexao from '../../config/db/database.js';
import Pessoa from '../../pessoa/models/index.js';

const conexao = new Conexao

class Aluno extends Pessoa {

    constructor(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, idAluno, numeroFaltas) {
        super(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario)
        this.numeroFaltas = numeroFaltas;
        this.idAluno = idAluno;
    }

    async buscarTodos() {
        const sql = 'SELECT * FROM aluno'

        const result = await conexao.query(sql);
        return result
    }

    buscar(id) {
        for (let i = 0; i < alunos.length; i++) {
            if (id === alunos[i].id) {
                return alunos[i];
            }
        }
        return false;
    }

    salvar(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas) {
        const novoAluno = new Pessoa(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas)
        alunos.push(novoAluno);
    }

    atualizar(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas) {

        for (let i = 0; i < alunos.length; i++) {
            if (id == alunos[i].id) {
                const alunoAtualizado = new Pessoa(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas)
                alunos[i] = alunoAtualizado;
                return alunoAtualizado;
            }
        }
        return false;
    }

    deletar(id) {
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index !== -1) {
            alunos.splice(index, 1);
            return true;
        }
        return false;
    }
}

export default Aluno;