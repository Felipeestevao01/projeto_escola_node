import res from "express/lib/response.js";
import Conexao from "../../../config/db/postgres.js"
import Materia from "../../models/index.js";

class MateriaRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const sql = ` SELECT 
                        id, 
                        descricao, 
                        carga_horaria, 
                        id_professor 
                    FROM 
                        materia 
                    WHERE dt_deleted is null;`

        const result = await this.client.conexao.query(sql);
        const materias = [];
        result.rows.forEach(row => {
            const linhaMateria = new Materia(
                row.id,
                row.descricao,
                row.carga_horaria,
                row.id_professor
            )
            materias.push(linhaMateria)
        });
        return materias
    }



    async buscar(id) {
        const sql = `SELECT 
                        id, 
                        descricao, 
                        carga_horaria, 
                        id_professor 
                    FROM 
                        materia 
                    WHERE id = $1 
                    AND dt_deleted is null;`

        const binds = [id];
        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0];
    }

    async salvar(descricao, carga_horaria, id_professor) {

        const sql = `INSERT INTO materia (
                            descricao, 
                            carga_horaria, 
                            id_professor
                        ) 
                        VALUES (
                            $1, 
                            $2, 
                            $3
                        )   
                        RETURNING id;`;

        const binds = [descricao, carga_horaria, id_professor]
        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0]
    }

    async atualizar(id, descricao, carga_horaria, id_professor) {
        const sql = `UPDATE materia SET 
			                descricao = $1,
			                carga_horaria = $2,
			                id_professor  = $3
			        WHERE id = $4`

        const binds = [descricao, carga_horaria, id_professor, id]
        const result = await this.client.conexao.query(sql, binds)
        return result.rows[0]
    }


    async deletar(id) {
        const sql = `UPDATE materia SET 
			            dt_deleted = NOW()
			        WHERE id = $1;`

        const binds = [id]
        const result = await this.client.conexao.query(sql, binds);
        return result.rows[0];
    }



}

export default MateriaRepository;