CREATE TABLE professor(
    id SERIAL PRIMARY KEY,
    salario DOUBLE PRECISION NOT NULL,
    id_pessoa INT NOT NULL,
    FOREIGN KEY(id_pessoa) REFERENCES pessoa(id)
);


-- Função de trigger para setar os timestamps
CREATE OR REPLACE FUNCTION set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar os timestamps na tabela nota
CREATE TRIGGER set_timestamp
BEFORE INSERT OR UPDATE ON professor
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();



-- INSERT INTO professor (salario, id_pessoa) VALUES 
-- (3500.75, 4),
-- (4500.50, 5),
-- (2000, 7),
-- (2800, 8);