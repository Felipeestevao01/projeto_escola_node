import Conexao from "../../../config/db/postgres.js"
import Trabalho from '../../models/index.js'

class TrabalhoRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const sql = `SELECT
                        id, 
                        descricao, 
                        data_trabalho, 
                        id_professor 
                    FROM 
                        trabalho 
                    WHERE 
                        dt_deleted is null;`

        const result = await this.client.conexao.query(sql);
        const trabalhos = [];
        result.rows.forEach(row => {
            const trabalhoAtual = new Trabalho(
                row.id,
                row.descricao,
                row.data_trabalho,
                row.id_professor
            )
            trabalhos.push(trabalhoAtual)
        });
        return trabalhos
    }

    async buscar(id) {
        const sql = `SELECT 
                        id, 
                        descricao, 
                        data_trabalho, 
                        id_professor 
                    FROM 
                        trabalho 
                    WHERE 
                        id = $1 
                    AND 
                        dt_deleted is null;`

        const binds = [id]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async salvar(descricao, data_trabalho, id_professor) {
        const sql = `INSERT INTO trabalho (
                        descricao, 
                        data_trabalho, 
                        id_professor
                    )
                    VALUES (
                        $1, 
                        $2,
                        $3 
                    );`

        const binds = [descricao, data_trabalho, id_professor]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async atualizar(id, descricao, data_trabalho, id_professor) {
        const sql = `UPDATE trabalho SET
                        descricao = $2,
                        data_trabalho = $3,
                        id_professor = $4
                    WHERE
                        id = $1
                    RETURNING id;`


        const binds = [id, descricao, data_trabalho, id_professor]
        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }

    async deletar(id) {
        const sql = `UPDATE trabalho SET
				        dt_deleted = NOW()
                    WHERE id = $1;`

        const binds = [id];

        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }
}

export default TrabalhoRepository;