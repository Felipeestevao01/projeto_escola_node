import Conexao from "../../../config/db/postgres.js"
import Questao from '../../models/index.js'

class QuestaoRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const listaQuestoes = [];
        const sql = `SELECT 
                        id, 
                        descricao, 
                        escolha 
                    FROM 
                        questoes 
                    WHERE 
                        dt_deleted is null;`

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const questaoAtual = new Questao(
                row.id,
                row.descricao,
                row.escolha
            )
            listaQuestoes.push(questaoAtual)
        });
        return listaQuestoes
    }

    async buscar(id) {
        const sql = `SELECT 
                        id, 
                        descricao, 
                        escolha 
                    FROM 
                        questoes 
                    where 
                        id = $1 
                    AND 
                        dt_deleted is null;`;

        const binds = [id];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async salvar(descricao, escolhas) {
        const sql = `INSERT INTO questoes (
                        descricao, 
                        escolha
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    RETURNING id;`
        const binds = [descricao, JSON.stringify(escolhas)];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async atualizar(id, descricao, escolhas) {
        const sql = `UPDATE questoes SET
                        descricao = $2,
                        escolha = $3
                    WHERE 
                        id = $1
                    RETURNING id;`

        const binds = [id, descricao, JSON.stringify(escolhas)];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async deletar(id) {
        const sql = `UPDATE questoes SET
				        dt_deleted = NOW()
                    WHERE id = $1;`
        const binds = [id];

        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }
}

export default QuestaoRepository;