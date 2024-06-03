class Pessoa {

    constructor(id, nome, sobrenome, telefone, cpf, endereco, email, dataAniversario) {
        this.Id = id;
        this.Nome = nome;
        this.Sobrenome = sobrenome;
        this.Telefone = telefone;
        this.Cpf = cpf;
        this.Endereco = endereco;
        this.Email = email;
        this.DataAniversario = dataAniversario;
    }

    getIdade() {
        let hoje = new Date()
        let idade = hoje.getFullYear() - this.DataAniversario.getFullYear()
        return idade
    }
}

export default Pessoa