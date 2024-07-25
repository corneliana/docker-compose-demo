import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool({
    user: 'username',
    host: 'db',
    database: 'tododb',
    password: 'password',
    port: 5432,
});

export function query(text, params) { return pool.query(text, params); }