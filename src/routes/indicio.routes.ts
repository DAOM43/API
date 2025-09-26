// src/routes/indicio.routes.ts
import { Router } from "express";
import * as C from "../controllers/indicio.controller";
import { auth } from "../auth/auth.middleware";
import { only } from "../auth/role.middleware";
const router = Router();

/** @openapi
 * tags: [{ name: "Indicios" }]
 */

/** @openapi
 * /expedientes/{id}/indicios:
 *  get:
 *    summary: Lista indicios por expediente
 *    tags: [Indicios]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    responses: { 200: { description: OK } }
 */
router.get("/expedientes/:id/indicios", auth, C.listarPorExpediente);

/** @openapi
 * /expedientes/{id}/indicios:
 *  post:
 *    summary: Crea indicio (rol técnico, dueño del expediente)
 *    tags: [Indicios]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: [codigo, descripcion, peso]
 *            properties:
 *              codigo: { type: string }
 *              descripcion: { type: string }
 *              peso: { type: number }
 *              color: { type: string }
 *              tamano: { type: string }
 *    responses: { 201: { description: Creado } }
 */
router.post("/expedientes/:id/indicios", auth, only("tecnico","coordinador"), C.crear);

/** @openapi
 * /indicios/{id}:
 *  put:
 *    summary: Actualiza indicio (solo técnico dueño)
 *    tags: [Indicios]
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
 *              peso: { type: number }
 *              color: { type: string }
 *              tamano: { type: string }
 *    responses: { 200: { description: OK } }
 */
router.put("/indicios/:id", auth, only("tecnico","coordinador"), C.actualizar);

/** @openapi
 * /indicios/{id}/activo:
 *  patch:
 *    summary: Activar/Desactivar indicio (soft delete)
 *    tags: [Indicios]
 *    security: [{ bearerAuth: [] }]
 *    parameters: [{ in: path, name: id, required: true, schema: { type: integer } }]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: { type: object, properties: { activo: { type: boolean } } }
 *    responses: { 200: { description: OK } }
 */
router.patch("/indicios/:id/activo", auth, C.activarDesactivar);

export default router;
