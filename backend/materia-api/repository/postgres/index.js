import res from "express/lib/response.js";
import Conexao from "../../../config/db/postgres.js"
import Materia from "../../models/index.js";

class MateriaRepository {
    constructor() {
        this.client = new Conexao()
    }

    async buscarTodos() {
        const listaMaterias = [];
        const sql = ` SELECT 
                        id, 
                        descricao, 
                        carga_horaria, 
                        id_professor 
                    FROM 
                        materia 
                    WHERE dt_deleted is null;`;

        const resultado = await this.client.conexao.query(sql);
        resultado.rows.forEach(row => {
            const materiaAtual = new Materia(
                row.id,
                row.descricao,
                row.carga_horaria,
                row.id_professor
            )
            listaMaterias.push(materiaAtual);
        });
        return listaMaterias;
    }



    async buscar(id) {
        const sql = `SELECT 
                        id, 
                        descricao, 
                        carga_horaria, 
                        id_professor 
                    FROM 
                        materia 
                    WHERE 
                        id = $1 
                    AND 
                        dt_deleted is null;`

        const binds = [id];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async salvar(descricao, cargaHoraria, idProfessor) {

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

        const binds = [descricao, cargaHoraria, idProfessor];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }

    async atualizar(id, descricao, cargaHoraria, idProfessor) {
        const sql = `UPDATE materia SET 
			            descricao = $2,
			            carga_horaria = $3,
			            id_professor  = $4
			        WHERE 
                        id = $1`

        const binds = [id, descricao, cargaHoraria, idProfessor];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }


    async deletar(id) {
        const sql = `UPDATE materia SET 
			            dt_deleted = NOW()
			        WHERE 
                        id = $1;`;

        const binds = [id];
        const resultado = await this.client.conexao.query(sql, binds);
        return resultado.rows[0];
    }



}

export default MateriaRepository;