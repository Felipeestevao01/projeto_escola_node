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
}

export default Model;