import Conexao from "../../../config/db/postgres.js"
import Professor from '../../models/index.js'

class ProfessorRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const listaProfessores = [];

        const sql = `SELECT 
                        professor.id AS professor_id,
                        professor.salario,
                        professor.id_pessoa,
                        pessoa.nome,
                        pessoa.sobrenome,
                        pessoa.telefone,
                        pessoa.cpf,
                        pessoa.endereco,
                        pessoa.email,
                        pessoa.data_aniversario
                    FROM 
                        professor
                    LEFT JOIN pessoa 
                    ON 
                        professor.id_pessoa = pessoa.id
                    WHERE 
                        pessoa.dt_deleted IS null
                    ORDER BY 
                        professor_id;`;

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const professorAtual = new Professor(
                row.professor_id,
                row.salario,
                row.id_pessoa,
                row.nome,
                row.sobrenome,
                row.telefone,
                row.cpf,
                row.endereco,
                row.email,
                row.data_aniversario
            );
            listaProfessores.push(professorAtual);
        });
        return listaProfessores;
    }

    async buscar(id) {

        const sql = `SELECT 
                        professor.id AS professor_id,
                        professor.salario ,
                        professor.id_pessoa,
                        pessoa.nome,
                        pessoa.sobrenome,
                        pessoa.telefone,
                        pessoa.cpf,
                        pessoa.endereco,
                        pessoa.email,
                        pessoa.data_aniversario
                    FROM 
                        professor
                    LEFT JOIN pessoa 
                    ON 
                        professor.id_pessoa = pessoa.id
                    WHERE 
                        professor.id = $1
                    AND 
                        pessoa.dt_deleted IS NULL;`;

        const binds = [id]
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async salvar(id, salario) {

        const sql = `INSERT INTO professor (
                        salario,
                        id_pessoa
                    )
                    VALUES (
                        $2,
                        $1
                    )
                    RETURNING id;`;
        const binds = [id, salario];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async atualizar(id, salario) {

        const sql = `UPDATE professor SET
                        salario = $2
                    WHERE 
                        id = $1
                    RETURNING id;`;
        const binds = [id, salario];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async deletar(id) {

        const sql = `UPDATE pessoa SET
                        dt_deleted = NOW()
                    WHERE 
                        id = $1;`;
        const binds = [id];

        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }
}

export default ProfessorRepository;