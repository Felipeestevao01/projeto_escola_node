CREATE TABLE trabalho(
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    data_trabalho DATE NOT NULL,
    id_professor INT NOT NULL,
    FOREIGN KEY(id_professor) REFERENCES professor(id),
    dt_deleted TIMESTAMP NULL
);
