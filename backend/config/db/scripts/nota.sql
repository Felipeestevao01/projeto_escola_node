CREATE TABLE nota(
    id SERIAL PRIMARY KEY,
    valor_nota DOUBLE PRECISION NOT NULL,
    id_trabalho INT NOT NULL,
    FOREIGN KEY(id_trabalho) REFERENCES trabalho(id),
    id_aluno INT NOT NULL,
    FOREIGN KEY(id_aluno) REFERENCES aluno(id)
);