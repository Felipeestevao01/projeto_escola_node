import Conexao from "../../../config/db/postgres.js"

class PessoaRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscar(id) {
        const sql = ` SELECT *
                        FROM pessoa
                        WHERE id = $1;`

        const binds = [id]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async salvar(res) {
        const { nome, sobrenome, telefone, cpf, endereco, email, dataAniversario } = res

        const sql = `INSERT INTO pessoa (
                        nome, 
                        sobrenome, 
                        telefone, 
                        cpf, 
                        endereco, 
                        email, 
                        data_aniversario
                    )
                    VALUES (
                        $1, 
                        $2, 
                        $3, 
                        $4, 
                        $5, 
                        $6, 
                        $7
                    )
                    RETURNING id;`

        const binds = [
            nome,
            sobrenome,
            telefone,
            cpf,
            endereco,
            email,
            dataAniversario
        ]

        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }

    async atualizar(id, res) {
        const { nome, sobrenome, telefone, cpf, endereco, email, data_aniversario } = res
        const sql = `UPDATE pessoa SET
                        nome = $1,
                        sobrenome = $2,
                        telefone = $3,
                        cpf = $4,
                        endereco = $5,
                        email = $6,
                        data_aniversario = $7
                    WHERE id = $8;`

        const binds = [
            nome,
            sobrenome,
            telefone,
            cpf,
            endereco,
            email,
            data_aniversario,
            id
        ]

        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }

    async deletar(id) {

        const sql = `UPDATE pessoa SET
                        dt_deleted = NOW()
                    WHERE id = $1;`

        const binds = [
            id
        ]

        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }
}

export default PessoaRepository;