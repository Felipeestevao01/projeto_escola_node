CREATE TABLE aluno(
    id SERIAL PRIMARY KEY,
    numero_falta INT,
    id_pessoa INT NOT NULL,
    FOREIGN KEY(id_pessoa) REFERENCES pessoa(id)
);
