import Pessoa from '../../pessoa/models/index.js';

class Aluno extends Pessoa {

    constructor(idAluno, numeroFaltas, idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario) {
        super(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario)
        this.numeroFaltas = numeroFaltas;
        this.idAluno = idAluno;
    }
}

export default Aluno;