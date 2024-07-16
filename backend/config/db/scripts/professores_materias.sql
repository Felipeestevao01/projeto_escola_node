-- Criação tabela intermediaria professor_materias
CREATE TABLE professor_materias(
    id SERIAL PRIMARY KEY,
    id_materia INT NOT NULL,
    FOREIGN KEY(id_materia) REFERENCES materia(id),
    id_professor INT NOT NULL,
    FOREIGN KEY(id_professor) REFERENCES professor(id),
    dt_deleted TIMESTAMP NULL
);