import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { requireRole } from '../auth/role.middleware';
import {
  listarIndiciosPorExpediente, crearIndicio, actualizarIndicio, activarDesactivarIndicio
} from '../controllers/indicio.controller';

const r = Router();
r.use(authMiddleware);
r.get('/expedientes/:id/indicios', listarIndiciosPorExpediente);
r.post('/expedientes/:id/indicios', requireRole('tecnico','coordinador'), crearIndicio);
r.put('/indicios/:id', requireRole('tecnico','coordinador'), actualizarIndicio);
r.patch('/indicios/:id/activo', requireRole('tecnico','coordinador'), activarDesactivarIndicio);
export default r;
