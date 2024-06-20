-- Criação tabela intermediaria materias_do_curso
CREATE TABLE materias_do_curso(
    id SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    FOREIGN KEY(id_curso) REFERENCES curso(id),
    id_materia INT NOT NULL,
    FOREIGN KEY(id_materia) REFERENCES materia(id)
);