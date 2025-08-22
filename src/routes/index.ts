import { Router } from 'express';
import auth from './auth.routes';
import expedientes from './expediente.routes';
import indicios from './indicio.routes';

const r = Router();
r.use('/auth', auth);
r.use('/expedientes', expedientes);
r.use('/', indicios); // mantiene paths /expedientes/:id/indicios y /indicios/:id
export default r;
