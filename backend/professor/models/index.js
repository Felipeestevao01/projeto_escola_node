import Pessoa from '../../pessoa/models/index.js';

class Professor extends Pessoa {

    constructor(idProfessor, salario, idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario) {
        super(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario)
        this.salario = salario;
        this.idProfessor = idProfessor;
    }
}

export default Professor;