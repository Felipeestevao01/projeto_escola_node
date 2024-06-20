CREATE TABLE pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    sobrenome VARCHAR(80) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    email VARCHAR(70) NOT NULL,
    data_aniversario DATE NOT NULL
);
