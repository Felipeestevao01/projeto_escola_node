import Pessoa from '../../pessoa-api/models/index.js';

class Aluno extends Pessoa {

    constructor(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario, idAluno, numeroFaltas) {
        super(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario)
        this.numeroFaltas = numeroFaltas;
        this.idAluno = idAluno;
    }
}

export default Aluno;