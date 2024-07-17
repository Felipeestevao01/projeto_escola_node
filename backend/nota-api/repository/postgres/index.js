import Conexao from "../../../config/db/postgres.js"
import Nota from '../../models/index.js'

class NotaRepository {
    constructor() {
        this.client = new Conexao()
    }

    buscarTodos = async () => {
        const listaNotas = [];
        const sql = `SELECT 
                        id, 
                        valor_nota, 
                        id_trabalho, 
                        id_aluno 
                    FROM 
                        nota
                    WHERE 
                        dt_deleted is null;`;

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const notaAtual = new Nota(
                row.id,
                row.valor_nota,
                row.id_trabalho,
                row.id_aluno
            )
            listaNotas.push(notaAtual);
        });
        return listaNotas;
    }

    buscar = async (id) => {
        const sql = `SELECT 
                        id, 
                        valor_nota,
                        id_trabalho, 
                        id_aluno 
                    FROM 
                        nota 
                    WHERE 
                        id = $1 
                    AND 
                        dt_deleted is null;`;

        const binds = [id];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    salvar = async (valorNota, idTrabalho, idAluno) => {
        const sql = `INSERT INTO nota ( 
                        valor_nota, 
                        id_trabalho, 
                        id_aluno
                    )
                    VALUES (
                        $1, 
                        $2, 
                        $3
                    )
                    RETURNING id;`

        const binds = [valorNota, idTrabalho, idAluno]
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0]
    }

    atualizar = async (id, valorNota, idTrabalho, idAluno) => {
        const sql = `UPDATE nota SET 
                        valor_nota = $2,
                        id_trabalho = $3,
                        id_aluno = $4
                    WHERE 
                        id = $1
                    RETURNING id;`;

        const binds = [id, valorNota, idTrabalho, idAluno]
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0]
    }

    deletar = async (id) => {
        const sql = `UPDATE nota SET
                        dt_deleted = NOW()
                    WHERE id = $1;`;

        const binds = [id];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0]
    }
}

export default NotaRepository