import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projeto_escola',
  password: '123456',
  port: 5432,
})

class Conexao {
    constructor() {
        this.conexao = pool
    }

    async query(text, params) {
        const query = await this.conexao.query(text, params);
        return query;
    }
}

export default Conexao;