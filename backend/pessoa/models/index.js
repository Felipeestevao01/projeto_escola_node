class Pessoa {

    constructor(idPessoa, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario) {
        this.id = idPessoa;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email;
        this.dataAniversario = new Date(dataAniversario);
    }
}

export default Pessoa