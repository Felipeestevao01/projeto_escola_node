
import Conexao from "../../../config/db/postgres.js"
import Curso from "../../models/index.js";

class CursoRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const listaCursos = [];

        const sql = `SELECT 
                        id, 
                        nome, 
                        ativo 
                    FROM 
                        curso 
                    WHERE 
                        dt_deleted is null;`;

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const cursoAtual = new Curso(
                row.id,
                row.nome,
                row.ativo
            )
            listaCursos.push(cursoAtual);
        });
        return listaCursos;
    }

    async buscar(id) {
        const sql = `SELECT
                         id,
                         nome,
                         ativo
                    FROM 
                        curso 
                    WHERE 
                        id = $1 
                    AND 
                        dt_deleted is null;
        `

        const binds = [id]
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async salvar(nome, ativo) {
        const sql = `INSERT INTO curso (
                        nome,
                        ativo
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    RETURNING id;`;

        const binds = [nome, ativo];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async atualizar(id, nome, ativo) {
        const sql = `UPDATE curso SET
                        nome = $2,
				        ativo = $3 
				    WHERE id = $1
                    RETURNING id;`;
        const binds = [id, nome, ativo];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async deletar(id) {
        const sql = `UPDATE curso SET
				        dt_deleted = NOW()
                    WHERE id = $1;`
        const binds = [id];

        const resultado = await this.client.conexao.query(sql, binds)
        return resultado.rows[0];
    }
}

export default CursoRepository;
