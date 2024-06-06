const { Pool } = require('pg');

const credenciais = {
    user: 'postgres',
    host: 'localhost',
    database: 'projetoescola',
    password: '123456',
    port: 5432
};

class Conexao {
    constructor() {
        this.pool = new Pool(credenciais);
    }

}

export default Conexao;
