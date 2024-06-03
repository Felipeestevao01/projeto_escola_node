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
        return "Nenhum aluno cadastrado com esse id.";
    }

    salvarAluno(id, nome, email, idade) {
        const novoAluno = new Aluno(id, nome, email, idade)
        alunos.push(novoAluno)
    }

    atualizarAluno(id, nome, email, idade) {
        for (let i = 1; i < alunos.length; i++) {
            const alunoAtualizado = {
                id: id,
                nome: nome,
                email: email,
                idade: idade
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

export default Aluno;