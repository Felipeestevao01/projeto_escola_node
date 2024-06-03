import alunos from '../../bd.js'
class Model {
    constructor() { }

    buscarAluno(id) {
        for (let i = 0; i < alunos.length; i++) {
            const alunoAtual = alunos[i]
            if (id == alunoAtual.id) {
                return alunoAtual
            }
        }
    }

    buscarAlunos() {
        for (let i = 0; i < alunos.length; i++) {
            return alunos
        }
    }

    criarAluno(id) {
        const novoAluno = { id: id, nome: "Michel", email: "michel@gmail.com", idade: 36 }
        alunos.push(novoAluno)
    }

    atualizarAluno(id) {
        for (let i = 1; i < alunos.length; i++) {
            const alunoAtualizado = {
                id: id,
                nome: "Teste",
                email: "Teste@gmail.com",
                idade: 20
            }
            if (id == alunoAtualizado.id) {
                alunos[i] = alunoAtualizado
                return alunoAtualizado
            }
        }
    }

    deletarAluno(id) {
        return alunos.filter(aluno => aluno.id != id);
    }
}

export default Model;