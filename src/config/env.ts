import 'dotenv/config';
import type { SignOptions } from 'jsonwebtoken'; // 👈 agrega este import de tipos

export const env = {
  port: Number(process.env.PORT ?? 3000),
  db: {
    server: process.env.DB_SERVER ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 1433),
    user: process.env.DB_USER ?? 'sa',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'GestionExpedientes',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'secret',
    // 👇 cast al tipo que espera jsonwebtoken
    expiresIn: (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn'],
  },
  nodeEnv: process.env.NODE_ENV ?? 'development',
};