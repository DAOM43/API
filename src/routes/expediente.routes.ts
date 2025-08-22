import { Router } from 'express';
import { authMiddleware } from '../auth/auth.middleware';
import { requireRole } from '../auth/role.middleware';
import {
  listarExpedientes, obtenerExpediente, crearExpediente,
  actualizarExpediente, cambiarEstado, activarDesactivarExpediente
} from '../controllers/expediente.controller';

const r = Router();
r.use(authMiddleware);
r.get('/', listarExpedientes);
r.get('/:id', obtenerExpediente);
r.post('/', requireRole('tecnico','coordinador'), crearExpediente);
r.put('/:id', requireRole('tecnico','coordinador'), actualizarExpediente);
r.patch('/:id/estado', requireRole('coordinador'), cambiarEstado);
r.patch('/:id/activo', requireRole('tecnico','coordinador'), activarDesactivarExpediente);
export default r;
