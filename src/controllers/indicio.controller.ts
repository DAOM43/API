import { Request, Response } from 'express';
import { getPool } from '../db/db';

export async function listarIndiciosPorExpediente(req: Request, res: Response) {
  const expediente_id = Number(req.params.id);
  const pool = await getPool();
  const result = await pool.request()
    .input('p_expediente_id', expediente_id)
    .query(`EXEC dbo.sp_Indicios_ListarPorExpediente @p_expediente_id`);
  res.json(result.recordset);
}

export async function crearIndicio(req: Request, res: Response) {
  const expediente_id = Number(req.params.id);
  const { codigo, descripcion, peso, color, tamano } = req.body;
  const pool = await getPool();
  const result = await pool.request()
    .input('p_expediente_id', expediente_id)
    .input('p_codigo', codigo)
    .input('p_descripcion', descripcion)
    .input('p_peso', Number(peso))
    .input('p_color', color ?? null)
    .input('p_tamano', tamano ?? null)
    .query(`EXEC dbo.sp_Indicios_Crear @p_expediente_id, @p_codigo, @p_descripcion, @p_peso, @p_color, @p_tamano`);
  res.status(201).json({ id: result.recordset?.[0]?.id });
}

export async function actualizarIndicio(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { descripcion, peso, color, tamano } = req.body;
  const pool = await getPool();
  await pool.request()
    .input('p_id', id)
    .input('p_descripcion', descripcion)
    .input('p_peso', Number(peso))
    .input('p_color', color ?? null)
    .input('p_tamano', tamano ?? null)
    .query(`EXEC dbo.sp_Indicios_Actualizar @p_id, @p_descripcion, @p_peso, @p_color, @p_tamano`);
  res.json({ ok: true });
}

export async function activarDesactivarIndicio(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { activo } = req.body as { activo: boolean };
  const pool = await getPool();
  await pool.request()
    .input('p_id', id)
    .input('p_activo', activo ? 1 : 0)
    .query(`EXEC dbo.sp_Indicios_ActivarDesactivar @p_id, @p_activo`);
  res.json({ ok: true });
}
