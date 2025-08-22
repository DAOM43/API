import { Request, Response } from 'express';
import { getPool } from '../db/db';
import bcrypt from 'bcryptjs';
import { signToken } from '../auth/jwt.utils';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const pool = await getPool();
  const result = await pool.request()
    .input('p_email', email)
    .query(`EXEC dbo.sp_Usuarios_Login @p_email`);
  const user = result.recordset?.[0];
  if (!user || !user.activo) return res.status(401).json({ message: 'Credenciales inválidas' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = signToken({ id: user.id, rol: user.rol });
  res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
}
