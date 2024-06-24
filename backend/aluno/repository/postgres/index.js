import Conexao from "../../../config/db/database";
import Aluno from "../../models/index"

class AlunoRepository{
    constructor(){
        this.conexao = new Conexao()
    }
    
    async buscarTodos() {

        const sql = `SELECT * 
                        FROM aluno
                        LEFT JOIN pessoa 
                        ON aluno.id_pessoa = pessoa.id`

        const result = await conexao.query(sql);
        const alunos = []
        result.rows.forEach(row => {
            const novoAluno = new Aluno(row.id_pessoa, row.nome, row.sobrenome, row.telefone, row.cpf, row.endereco, row.email, row.data_aniversario, row.id, row.numero_falta)
            alunos.push(novoAluno)
        });
        return alunos
    }
}

export default AlunoRepository;