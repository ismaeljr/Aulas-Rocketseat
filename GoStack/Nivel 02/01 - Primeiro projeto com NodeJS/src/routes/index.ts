import { Router } from 'express';
import appointmentsRouter from './appointmentsRoutes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // exemplo de uso de middlewire

export default routes;
