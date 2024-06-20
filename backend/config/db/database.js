import pg from 'pg';
const conexao = new pg.Connection();

const credenciais = {
    user: 'postgres',
    host: 'localhost',
    database: 'projeto_escola',
    password: '123456',
    port: 5432
};

class Conexao {
    constructor() {
    }

    async query(text, params) {
        const client = await this.pool.connect();
        try {
            const query = await client.query(text, params);
            return query;
        } finally {
            client.release();
        }
    }

    async close() {
        await this.pool.end();
    }
}

export default Conexao;