CREATE TABLE pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    sobrenome VARCHAR(80) NOT NULL,
    telefone VARCHAR(25) NOT NULL,
    cpf VARCHAR(20) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    email VARCHAR(70) NOT NULL,
    data_aniversario DATE NOT NULL
);


-- INSERT INTO pessoa (nome, sobrenome, telefone, cpf, endereco, email, data_aniversario) VALUES 
-- ('Matheus', 'Costa', '1234-5678', '123.456.789-01', 'Rua das Palmeiras, 456', 'matheus.costa@example.com', '1995-07-10'),
-- ('Amanda', 'Silva', '1111-1111', '111.222.333-44', 'Av Itaipava, 321', 'amanda@example.com', '1996-01-28'),
-- ('Anderson', 'Silva', '8765-4321', '987.654.321-09', 'Avenida Central, 789', 'anderson.silva@example.com', '1988-03-25'),
-- ('Michel', 'Pereira', '1234-9876', '654.321.987-05', 'Travessa do Sol, 101', 'michel.pereira@example.com', '1992-11-20'),
-- ('Vitor', 'Santos', '8765-1234', '321.654.987-04', 'Alameda das Acácias, 202', 'vitor.santos@example.com', '1985-05-30'),
-- ('Juan', 'Oliveira', '4321-8765', '456.789.123-08', 'Praça das Rosas, 303', 'juan.oliveira@example.com', '1990-01-15');
