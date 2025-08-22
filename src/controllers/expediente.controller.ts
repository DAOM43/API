import { Request, Response } from 'express';
import { getPool } from '../db/db';

export async function listarExpedientes(req: Request, res: Response) {
  const page = Number(req.query.page ?? 1);
  const size = Number(req.query.size ?? 10);
  const search = (req.query.search as string) ?? null;

  const pool = await getPool();
  const result = await pool.request()
    .input('p_search', search)
    .input('p_page', page)
    .input('p_size', size)
    .query(`EXEC dbo.sp_Expedientes_Listar @p_search, @p_page, @p_size`);
  res.json(result.recordset);
}

export async function obtenerExpediente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const pool = await getPool();
  const result = await pool.request()
    .input('p_id', id)
    .query(`EXEC dbo.sp_Expedientes_Obtener @p_id`);
  const exp = result.recordset?.[0];
  if (!exp) return res.status(404).json({ message: 'No encontrado' });
  res.json(exp);
}

export async function crearExpediente(req: Request, res: Response) {
  const { codigo, descripcion } = req.body;
  const tecnico_id = req.user!.id; // del token
  const pool = await getPool();
  const result = await pool.request()
    .input('p_codigo', codigo)
    .input('p_descripcion', descripcion)
    .input('p_tecnico_id', tecnico_id)
    .query(`EXEC dbo.sp_Expedientes_Crear @p_codigo, @p_descripcion, @p_tecnico_id`);
  res.status(201).json({ id: result.recordset?.[0]?.id });
}

export async function actualizarExpediente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { descripcion } = req.body;
  const pool = await getPool();
  await pool.request()
    .input('p_id', id)
    .input('p_descripcion', descripcion)
    .query(`EXEC dbo.sp_Expedientes_Actualizar @p_id, @p_descripcion`);
  res.json({ ok: true });
}

export async function cambiarEstado(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { estado, justificacion } = req.body;
  const aprobador_id = req.user!.id;
  const pool = await getPool();
  await pool.request()
    .input('p_id', id)
    .input('p_estado', estado)
    .input('p_justificacion', justificacion ?? null)
    .input('p_aprobador_id', aprobador_id)
    .query(`EXEC dbo.sp_Expedientes_CambiarEstado @p_id, @p_estado, @p_justificacion, @p_aprobador_id`);
  res.json({ ok: true });
}

export async function activarDesactivarExpediente(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { activo } = req.body as { activo: boolean };
  const pool = await getPool();
  await pool.request()
    .input('p_id', id)
    .input('p_activo', activo ? 1 : 0)
    .query(`EXEC dbo.sp_Expedientes_ActivarDesactivar @p_id, @p_activo`);
  res.json({ ok: true });
}
