-- Criação tabela de pessoa
CREATE TABLE pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    sobrenome VARCHAR(80) NOT NULL,
    telefone VARCHAR(25),
    cpf VARCHAR(20),
    endereco VARCHAR(150),
    email VARCHAR(70),
    data_aniversario DATE
);

-- Criação tabela curso
CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    ativo BOOLEAN NOT NULL
);

-- Criação tabela professor
CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    salario DOUBLE PRECISION NOT NULL,
    id_pessoa INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa (id)
);

-- Criação tabela trabalho
CREATE TABLE trabalho (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    data_trabalho DATE NOT NULL,
    id_professor INT NOT NULL,
    FOREIGN KEY (id_professor) REFERENCES professor (id)
);

-- Criação tabela nota
CREATE TABLE nota (
    id SERIAL PRIMARY KEY,
    valor_nota DOUBLE PRECISION NOT NULL,
    id_trabalho INT NOT NULL,
    FOREIGN KEY (id_trabalho) REFERENCES trabalho (id),
    id_aluno INT NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES aluno (id)
);

-- Criação tabela questoes
CREATE TABLE questoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(220) NOT NULL,
    escolha VARCHAR(200)
);

-- Criação tabela intermediaria questoes_trabalhos
CREATE TABLE questoes_trabalhos (
    id SERIAL PRIMARY KEY,
    id_questao INT NOT NULL,
    FOREIGN KEY (id_questao) REFERENCES questoes (id),
    id_trabalho INT NOT NULL,
    FOREIGN KEY (id_trabalho) REFERENCES trabalho (id)
);

-- Criação tabela materia
CREATE TABLE materia (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(100) NOT NULL,
    carga_horaria DOUBLE PRECISION NOT NULL,
    id_professor INT,
    FOREIGN KEY (id_professor) REFERENCES professor (id)
);

-- Criação tabela intermediaria materias_do_curso
CREATE TABLE materias_do_curso (
    id SERIAL PRIMARY KEY,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso (id),
    id_materia INT NOT NULL,
    FOREIGN KEY (id_materia) REFERENCES materia (id)
);

-- Criação tabela intermediaria professor_materias
CREATE TABLE professor_materias (
    id SERIAL PRIMARY KEY,
    id_materia INT NOT NULL,
    FOREIGN KEY (id_materia) REFERENCES materia (id),
    id_professor INT NOT NULL,
    FOREIGN KEY (id_professor) REFERENCES professor (id)
);

-- Criação tabela aluno
CREATE TABLE aluno (
    id SERIAL PRIMARY KEY,
    numero_falta INT,
    id_pessoa INT NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa (id)
);

-- Criação tabela matricula
CREATE TABLE matricula (
    id SERIAL PRIMARY KEY,
    ativa BOOLEAN,
    id_aluno INT,
    FOREIGN KEY (id_aluno) REFERENCES aluno (id),
    id_curso INT,
    FOREIGN KEY (id_curso) REFERENCES curso (id)
);