class Pessoa {

    constructor(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.telefone = telefone;
        this.cpf = cpf;
        this.endereco = endereco;
        this.email = email;
        this.dataAniversario = new Date(dataAniversario);
    }

    getIdade() {
        let hoje = new Date()
        let idade = hoje.getFullYear() - this.dataAniversario.getFullYear()
        return idade
    }
}

export default Pessoa