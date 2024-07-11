
import Conexao from "../../../config/db/postgres.js"
import Curso from "../../models/index.js";

class CursoRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const sql = `SELECT 
                        id, 
                        nome, 
                        ativo 
                    FROM 
                        curso 
                    WHERE 
                        dt_deleted is null;`

        const result = await this.client.conexao.query(sql);
        const cursos = [];
        result.rows.forEach(row => {
            const novoCurso = new Curso(
                row.id,
                row.nome,
                row.ativo
            )
            cursos.push(novoCurso)
        });
        return cursos
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
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
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
                    RETURNING id;`

        const binds = [nome, ativo]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async atualizar(id, nome, ativo) {
        const sql = `UPDATE curso SET
                        nome = $2,
				        ativo = $3 
				    WHERE id = $1
                    RETURNING id;`


        const binds = [id, nome, ativo]

        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }

    async deletar(id) {
        const sql = `UPDATE curso SET
				        dt_deleted = NOW()
                    WHERE id = $1;`

        const binds = [id];

        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }
}

export default CursoRepository;
