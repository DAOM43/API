import { Request, Response } from 'express';
import { getPool } from '../db/db';
import bcrypt from 'bcryptjs';

export async function crearUsuario(req: Request, res: Response) {
  const { nombre, email, rol, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const pool = await getPool();
  const result = await pool.request()
    .input('p_nombre', nombre)
    .input('p_email', email)
    .input('p_rol', rol)
    .input('p_password_hash', password_hash)
    .query(`EXEC dbo.sp_Usuarios_Crear @p_nombre, @p_email, @p_rol, @p_password_hash`);
  res.status(201).json({ id: result.recordset?.[0]?.id });
}
