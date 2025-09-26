// src/controllers/indicio.controller.ts
import { Request, Response } from "express";
import { getPool } from "../db/db";

export async function listarPorExpediente(req: Request, res: Response) {
  const pool = await getPool();
  const r = await pool.request()
    .input("expediente_id", Number(req.params.id))
    .execute("dbo.sp_Indicios_ListarPorExpediente");
  res.json(r.recordset);
}

export async function crear(req: Request, res: Response) {
  const { codigo, descripcion, peso, color, tamano } = req.body;
  const pool = await getPool();
  const r = await pool.request()
    .input("expediente_id", Number(req.params.id))
    .input("codigo", codigo)
    .input("descripcion", descripcion)
    .input("peso", Number(peso))
    .input("color", color ?? null)
    .input("tamano", tamano ?? null)
    .input("tecnico_id", req.user!.id)
    .execute("dbo.sp_Indicios_Crear");
  res.status(201).json(r.recordset[0]);
}

export async function actualizar(req: Request, res: Response) {
  const { codigo, descripcion, peso, color, tamano } = req.body;
  const pool = await getPool();
  const r = await pool.request()
    .input("id", Number(req.params.id))
    .input("codigo", codigo)
    .input("descripcion", descripcion)
    .input("peso", Number(peso))
    .input("color", color ?? null)
    .input("tamano", tamano ?? null)
    .input("tecnico_id", req.user!.id)
    .execute("dbo.sp_Indicios_Actualizar");
  if (!r.recordset[0]) return res.status(404).json({ message: "No encontrado" });
  res.json(r.recordset[0]);
}

export async function activarDesactivar(req: Request, res: Response) {
  const pool = await getPool();
  const r = await pool.request()
    .input("id", Number(req.params.id))
    .input("activo", req.body.activo === true)
    .execute("dbo.sp_Indicios_ActivarDesactivar");
  if (!r.recordset[0]) return res.status(404).json({ message: "No encontrado" });
  res.json(r.recordset[0]);
}
