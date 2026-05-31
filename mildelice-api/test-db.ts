// test-db.ts
import 'dotenv/config';
import { Pool } from 'pg';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query('SELECT 1')
  .then((res) => {
    console.log('Connexion OK:', res.rows);
    pool.end();
  })
  .catch((err) => {
    console.error('Erreur connexion Postgres:', err);
    pool.end();
  });