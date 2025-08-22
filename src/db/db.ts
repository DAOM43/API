import sql, { config as SqlConfig } from 'mssql';
import { env } from '../config/env';

const config: SqlConfig = {
  server: env.db.server,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool: sql.ConnectionPool;

export async function getPool() {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}
