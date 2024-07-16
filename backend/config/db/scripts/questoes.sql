CREATE TABLE questoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(220) NOT NULL,
    escolha JSON,
    dt_deleted TIMESTAMP NULL
);