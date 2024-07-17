import Conexao from "../../../config/db/postgres.js"
import Trabalho from '../../models/index.js'

class TrabalhoRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const listaTrabalhos = [];

        const sql = `SELECT
                        id, 
                        descricao, 
                        data_trabalho, 
                        id_professor 
                    FROM 
                        trabalho 
                    WHERE 
                        dt_deleted is null;`;

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const trabalhoAtual = new Trabalho(
                row.id,
                row.descricao,
                row.data_trabalho,
                row.id_professor
            )
            listaTrabalhos.push(trabalhoAtual);
        });
        return listaTrabalhos;
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
                        dt_deleted is null;`;
        const binds = [id];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async salvar(descricao, dataTrabalho, idProfessor) {
        const sql = `INSERT INTO trabalho (
                        descricao, 
                        data_trabalho, 
                        id_professor
                    )
                    VALUES (
                        $1, 
                        $2,
                        $3 
                    );`;
        const binds = [descricao, dataTrabalho, idProfessor];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async atualizar(id, descricao, dataTrabalho, idProfessor) {
        const sql = `UPDATE trabalho SET
                        descricao = $2,
                        data_trabalho = $3,
                        id_professor = $4
                    WHERE
                        id = $1
                    RETURNING id;`
        const binds = [id, descricao, dataTrabalho, idProfessor];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async deletar(id) {
        const sql = `UPDATE trabalho SET
				        dt_deleted = NOW()
                    WHERE id = $1;`
        const binds = [id];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }
}

export default TrabalhoRepository;