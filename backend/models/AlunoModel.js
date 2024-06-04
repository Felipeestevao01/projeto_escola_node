import alunos from '../../bd.js'
import Pessoa from './PessoaModel.js';

class Aluno extends Pessoa {

    constructor(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas) {
        super(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario)
        this.numeroFaltas = numeroFaltas;
    }

    buscarAlunos() {
        return alunos
    }

    buscarAluno(id) {
        for (let i = 0; i <= alunos.length; i++) {
            if (id === alunos[i].id) {
                return alunos[i];
            }
        }
        return false;
    }

    salvarAluno(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas) {
        const novoAluno = new Aluno(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas)
        alunos.push(novoAluno);
    }

    atualizarAluno(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas) {

        for (let i = 0; i < alunos.length; i++) {
            if (id == alunos[i].id) {
                const alunoAtualizado = new Aluno(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, numeroFaltas)
                alunos[i] = alunoAtualizado;
                return alunoAtualizado;
            }
        }
        return false;
    }

    deletarAluno(id) {
        const index = alunos.findIndex(aluno => aluno.id === id);
        if (index !== -1) {
            alunos.splice(index, 1);
            return true;
        }
        return false;
    }
}

export default Aluno;