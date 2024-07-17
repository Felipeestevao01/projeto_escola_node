import Conexao from "../../../config/db/postgres.js"
import Aluno from "../../models/index.js"

class AlunoRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const listaAlunos = [];

        const sql = `SELECT 
                        aluno.id AS aluno_id,
                        aluno.numero_falta,
                        aluno.id_pessoa,
                        pessoa.nome,
                        pessoa.sobrenome,
                        pessoa.telefone,
                        pessoa.cpf,
                        pessoa.endereco,
                        pessoa.email,
                        pessoa.data_aniversario
                    FROM 
                        aluno
                    LEFT JOIN pessoa
                    ON 
                        aluno.id_pessoa = pessoa.id
                    WHERE 
                        pessoa.dt_deleted IS null
                    ORDER BY 
                        aluno_id;`;

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const alunoAtual = new Aluno(
                row.aluno_id,
                row.nome,
                row.sobrenome,
                row.telefone,
                row.cpf,
                row.endereco,
                row.email,
                row.data_aniversario,
                row.id_pessoa,
                row.numero_falta
            );
            listaAlunos.push(alunoAtual);
        });
        return listaAlunos;
    }

    async buscar(id) {

        const sql = `SELECT 
                        aluno.id AS aluno_id,
                        aluno.numero_falta,
                        aluno.id_pessoa,
                        pessoa.nome,
                        pessoa.sobrenome,
                        pessoa.telefone,
                        pessoa.cpf,
                        pessoa.endereco,
                        pessoa.email,
                        pessoa.data_aniversario
                    FROM 
                        aluno
                    LEFT JOIN pessoa
                    ON 
                        aluno.id_pessoa = pessoa.id
                    WHERE 
                        aluno.id = $1
                    AND 
                        pessoa.dt_deleted IS NULL;`;

        const binds = [id];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async salvar(numeroFalta, id) {

        const sql = `INSERT INTO aluno (
                        numero_falta,
                        id_pessoa
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    RETURNING id;`;
        const binds = [numeroFalta, id];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];

    }

    async atualizar(numeroFalta, id) {

        const sql = `UPDATE aluno SET
                        numero_falta = $1
                    WHERE 
                        id = $2
                    RETURNING id;`;
        const binds = [numeroFalta, id];

        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async deletar(id) {

        const sql = `UPDATE pessoa SET
                        dt_deleted = NOW()
                    WHERE id = $1;`;
        const binds = [id];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }
}

export default AlunoRepository;