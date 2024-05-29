import alunos from '../../bd.js'
class Model {
    constructor() { }

    buscarAluno(id) {
        const alunoAtual = alunos[id]
        return alunoAtual
    }
}

export default Model;