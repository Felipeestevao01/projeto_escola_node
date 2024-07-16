CREATE TABLE matricula(
    id SERIAL PRIMARY KEY,
    ativa BOOLEAN,
    id_aluno INT,
    FOREIGN KEY(id_aluno) REFERENCES aluno(id),
    id_curso INT,
    FOREIGN KEY(id_curso) REFERENCES curso(id),
    dt_deleted TIMESTAMP NULL
);