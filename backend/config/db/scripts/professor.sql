CREATE TABLE professor(
    id SERIAL PRIMARY KEY,
    salario DOUBLE PRECISION NOT NULL,
    id_pessoa INT NOT NULL,
    FOREIGN KEY(id_pessoa) REFERENCES pessoa(id)
);
