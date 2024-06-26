CREATE TABLE aluno(
    id SERIAL PRIMARY KEY,
    numero_falta INT,
    id_pessoa INT NOT NULL,
    FOREIGN KEY(id_pessoa) REFERENCES pessoa(id)
);


-- INSERT INTO aluno (numero_falta, id_pessoa) VALUES 
-- (5, 1),
-- (2, 2),
-- (8, 3),
-- (2, 6);