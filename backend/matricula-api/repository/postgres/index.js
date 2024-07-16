import Conexao from "../../../config/db/postgres.js"
import Matricula from "../../models/index.js";

class MatriculaRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const sql = `SELECT 
                        id, 
                        ativa,
                        id_aluno,
                        id_curso
                    FROM 
                        matricula
                    WHERE 
                        dt_deleted is null;`

        const result = await this.client.conexao.query(sql);
        const matriculas = [];
        result.rows.forEach(row => {
            const matriculaAtual = new Matricula(
                row.id,
                row.ativa,
                row.id_aluno,
                row.id_curso
            )
            matriculas.push(matriculaAtual)
        });
        return matriculas
    }

    async buscar(id) {
        const sql = `SELECT
                        id, 
                        ativa,
                        id_aluno,
                        id_curso
                    FROM 
                        matricula
                    WHERE 
                        id = $1 
                    AND 
                        dt_deleted is null;`

        const binds = [id]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async salvar(ativa, id_aluno, id_curso) {
        const sql = `INSERT INTO matricula (
                        ativa, 
                        id_aluno, 
                        id_curso
                    )
                    VALUES(
                        $1, 
                        $2, 
                        $3
                    )
                    RETURNING id;`

        const binds = [ativa, id_aluno, id_curso]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async atualizar(id, ativo) {
        const sql = `UPDATE matricula SET
                        ativa = $2
				    WHERE id = $1
                    RETURNING id;`


        const binds = [id, ativo]
        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }

    async deletar(id) {
        const sql = `UPDATE matricula SET
				        dt_deleted = NOW()
                    WHERE id = $1;`

        const binds = [id];

        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }

}

export default MatriculaRepository;