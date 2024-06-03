import alunos from '../../bd.js'
class Aluno {

    constructor(id, nome, email, idade) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.idade = idade;
    }

    buscarAlunos() {
        return alunos
    }

    buscarAluno(id) {
        for (let i = 0; i < alunos.length; i++) {
            const alunoAtual = alunos[i]
            if (id == alunoAtual.id) {
                return alunoAtual;
            }
        }
        return false;
    }

    salvarAluno(id, nome, email, idade) {
        const novoAluno = new Aluno(id, nome, email, idade)
        alunos.push(novoAluno);
    }

    atualizarAluno(id, nome, email, idade) {

        for (let i = 0; i < alunos.length; i++) {
            if (id == alunos[i].id) {
                const alunoAtualizado = new Aluno(id, nome, email, idade)
                alunos[i] = alunoAtualizado;
                return alunoAtualizado;
            }
        }
        return false;
    }

    deletarAluno(id) {
        return alunos.filter(aluno => aluno.id != id);
    }
}

export default Aluno;