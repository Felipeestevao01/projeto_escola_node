CREATE TABLE nota(
    id SERIAL PRIMARY KEY,
    valor_nota DOUBLE PRECISION NOT NULL,
    id_trabalho INT NOT NULL,
    FOREIGN KEY(id_trabalho) REFERENCES trabalho(id),
    id_aluno INT NOT NULL,
    FOREIGN KEY(id_aluno) REFERENCES aluno(id)
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
BEFORE INSERT OR UPDATE ON nota
FOR EACH ROW
EXECUTE FUNCTION set_timestamp();