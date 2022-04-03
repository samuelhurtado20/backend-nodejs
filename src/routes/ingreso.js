import routerx from 'express-promise-router';
import auth from '../middlewares/auth'

import IngresoController from '../controllers/Ingreso'

const app = routerx();

// post
app.post('/add', auth.verifyUserAlmace , IngresoController.add);
// get
app.get('/query', auth.verifyUserAlmace ,IngresoController.query );
app.get('/list', auth.verifyUserAlmace ,IngresoController.list );
app.get('/grafanual', auth.verifyUser , IngresoController.grafAnual);
app.get('/consulFecha', auth.verifyUser , IngresoController.consultFecha);
// put
app.put('/activate', auth.verifyUserAlmace , IngresoController.activate);
app.put('/desactivate', auth.verifyUserAlmace , IngresoController.desactivate);


export default app;