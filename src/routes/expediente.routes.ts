// src/routes/expediente.routes.ts
import { Router } from "express";
import * as C from "../controllers/expediente.controller";
import { auth } from "../auth/auth.middleware";
import { only } from "../auth/role.middleware";
const router = Router();

/**
 * @openapi
 * tags: [{ name: "Expedientes" }]
 */

/** @openapi
 * /expedientes:
 *  get:
 *    summary: Lista expedientes (paginado y filtros)
 *    tags: [Expedientes]
 *    security: [{ bearerAuth: [] }]
 *    parameters:
 *      - in: query; name: page; schema: { type: integer, default: 1 }
 *      - in: query; name: size; schema: { type: integer, default: 10 }
 *      - in: query; name: estado; schema: { type: string }
 *      - in: query; name: codigo; schema: { type: string }
 *    responses: { 200: { description: OK } }
 */
router.get("/", auth, C.listar);

/** @openapi
 * /expedientes/{id}:
 *  get:
 *    summary: Obtiene un expediente por id
 *    tags: [Expedientes]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    responses: { 200: { description: OK }, 404: { description: No encontrado } }
 */
router.get("/:id", auth, C.obtener);

/** @openapi
 * /expedientes:
 *  post:
 *    summary: Crea expediente (rol técnico)
 *    tags: [Expedientes]
 *    security: [{ bearerAuth: [] }]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [codigo, descripcion]
 *            properties:
 *              codigo: { type: string }
 *              descripcion: { type: string }
 *    responses: { 201: { description: Creado } }
 */
router.post("/", auth, only("tecnico","coordinador"), C.crear);

/** @openapi
 * /expedientes/{id}:
 *  put:
 *    summary: Actualiza expediente (solo dueño técnico)
 *    tags: [Expedientes]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              codigo: { type: string }
 *              descripcion: { type: string }
 *    responses: { 200: { description: OK } }
 */
router.put("/:id", auth, only("tecnico","coordinador"), C.actualizar);

/** @openapi
 * /expedientes/{id}/estado:
 *  patch:
 *    summary: Cambia estado (solo coordinador)
 *    tags: [Expedientes]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [estado]
 *            properties:
 *              estado: { type: string, enum: [aprobado, rechazado] }
 *              justificacion: { type: string }
 *    responses: { 200: { description: OK } }
 */
router.patch("/:id/estado", auth, only("coordinador"), C.cambiarEstado);

/** @openapi
 * /expedientes/{id}/activo:
 *  patch:
 *    summary: Activar/Desactivar (soft delete)
 *    tags: [Expedientes]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: { type: object, properties: { activo: { type: boolean } } }
 *    responses: { 200: { description: OK } }
 */
router.patch("/:id/activo", auth, C.activarDesactivar);

export default router;
