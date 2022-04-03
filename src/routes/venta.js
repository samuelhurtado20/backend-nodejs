import routerx from 'express-promise-router';
import auth from '../middlewares/auth'
import VentaController from '../controllers/Venta'

const app = routerx();

// post
app.post('/add',auth.verifyUserVende , VentaController.add);
// get
app.get('/query',auth.verifyUserVende ,VentaController.query );
app.get('/list',auth.verifyUserVende ,VentaController.list );
app.get('/grafanual',auth.verifyUser , VentaController.grafAnual);
app.get('/consulFecha',auth.verifyUser , VentaController.consultFecha);
// put
app.put('/activate',auth.verifyUserVende , VentaController.activate);
app.put('/desactivate',auth.verifyUserVende , VentaController.desactivate);

export default app;