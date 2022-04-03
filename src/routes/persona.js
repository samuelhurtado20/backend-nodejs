import routerx from 'express-promise-router';
import personaController from '../controllers/Persona';
import auth from '../middlewares/auth'

const app = routerx();

// post
app.post('/add', auth.verifyUser, personaController.add);
// get
app.get('/query', auth.verifyUser, personaController.query);
app.get('/list', auth.verifyUser, personaController.list);
app.get('/listClientes', auth.verifyUser, personaController.listCliente);
app.get('/listProveedores', auth.verifyUser, personaController.listProveedor);
// put
app.put('/update', auth.verifyUser, personaController.update);
app.put('/activate', auth.verifyUser, personaController.activate);
app.put('/desactivate', auth.verifyUser, personaController.desactivate);
// delete
app.delete('/remove', auth.verifyUser, personaController.remove);

export default app;