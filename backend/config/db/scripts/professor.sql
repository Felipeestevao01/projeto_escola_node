CREATE TABLE professor(
    id SERIAL PRIMARY KEY,
    salario DOUBLE PRECISION NOT NULL,
    id_pessoa INT NOT NULL,
    FOREIGN KEY(id_pessoa) REFERENCES pessoa(id)
);


-- INSERT INTO professor (salario, id_pessoa) VALUES 
-- (3500.75, 4),
-- (4500.50, 5),
-- (2000, 7),
-- (2800, 8);