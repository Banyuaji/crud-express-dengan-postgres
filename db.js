const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "SQ1mainangw",
    database: "siswa",
    host: "localhost",
    port: 5432
});

module.exports = pool;