-- Criação tabela intermediaria questoes_trabalhos
CREATE TABLE questoes_trabalhos(
    id SERIAL PRIMARY KEY,
    id_questao INT NOT NULL,
    FOREIGN KEY(id_questao) REFERENCES questoes(id),
    id_trabalho INT NOT NULL,
    FOREIGN KEY(id_trabalho) REFERENCES trabalho(id)
);
