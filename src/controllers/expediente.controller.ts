// src/controllers/expediente.controller.ts
import { Request, Response } from "express";
import { getPool } from "../db/db";

export async function listar(req: Request, res: Response) {
  const { page = 1, size = 10, estado, codigo } = req.query as any;
  const pool = await getPool();
  const r = await pool.request()
    .input("page", Number(page))
    .input("size", Number(size))
    .input("estado", estado ?? null)
    .input("codigo", codigo ?? null)
    .execute("dbo.sp_Expedientes_Listar");
  res.json(r.recordset);
}

export async function obtener(req: Request, res: Response) {
  const pool = await getPool();
  const r = await pool.request().input("id", Number(req.params.id))
    .execute("dbo.sp_Expedientes_Obtener");
  if (!r.recordset[0]) return res.status(404).json({ message: "No encontrado" });
  res.json(r.recordset[0]);
}

export async function crear(req: Request, res: Response) {
  const { codigo, descripcion } = req.body;
  const pool = await getPool();
  const r = await pool.request()
    .input("codigo", codigo)
    .input("descripcion", descripcion)
    .input("tecnico_id", req.user!.id)            // desde token (técnico)
    .execute("dbo.sp_Expedientes_Crear");
  res.status(201).json(r.recordset[0]);
}

export async function actualizar(req: Request, res: Response) {
  const { codigo, descripcion } = req.body;
  const pool = await getPool();
  const r = await pool.request()
    .input("id", Number(req.params.id))
    .input("codigo", codigo)
    .input("descripcion", descripcion)
    .input("tecnico_id", req.user!.id)            // asegurar ownership
    .execute("dbo.sp_Expedientes_Actualizar");
  if (!r.recordset[0]) return res.status(404).json({ message: "No encontrado" });
  res.json(r.recordset[0]);
}

export async function cambiarEstado(req: Request, res: Response) {
  const { estado, justificacion } = req.body as { estado: "aprobado"|"rechazado"; justificacion?: string };
  const pool = await getPool();
  const r = await pool.request()
    .input("id", Number(req.params.id))
    .input("nuevo_estado", estado)
    .input("justificacion", justificacion ?? null)
    .input("aprobador_id", req.user!.id)          // coordinador
    .execute("dbo.sp_Expedientes_CambiarEstado");
  if (!r.recordset[0]) return res.status(404).json({ message: "No encontrado" });
  res.json(r.recordset[0]);
}

export async function activarDesactivar(req: Request, res: Response) {
  const pool = await getPool();
  const r = await pool.request()
    .input("id", Number(req.params.id))
    .input("activo", req.body.activo === true)
    .execute("dbo.sp_Expedientes_ActivarDesactivar");
  if (!r.recordset[0]) return res.status(404).json({ message: "No encontrado" });
  res.json(r.recordset[0]);
}
