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
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const anoAniversario = this.dataAniversario.getFullYear();
        let idade = anoAtual - anoAniversario;

        return idade;
    }

    

}

export default Pessoa