CREATE TABLE materia (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    carga_horaria DOUBLE PRECISION NOT NULL,
    id_professor INT,
    dt_deleted TIMESTAMP NULL,
    FOREIGN KEY (id_professor) REFERENCES professor (id)
);