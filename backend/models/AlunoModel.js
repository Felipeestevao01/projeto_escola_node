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
        for (let i = 0; i < alunos.length; i++) {
            const alunoAtual = alunos[i]
            const novoAluno = {
                id: id,
                nome: "Teste",
                email: "Teste@gmail.com",
                idade: 20
            }
            if (id == alunoAtual.id) {
                alunoAtual = novoAluno
                return alunoAtual
            }
        }
    }

    deletarAluno(id) {
        for (let i = 0; i < alunos.length; i++) {
            const alunoAtual = alunos[i]
            if (id == alunoAtual.id) {
                return alunos.splice(i, 1)
            }
        }
    }
}

export default Model;