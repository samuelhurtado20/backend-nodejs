import routerx from 'express-promise-router';
import ArtController from '../controllers/Articulo';
import auth from '../middlewares/auth'

const app = routerx();

// post 
app.post('/add',auth.verifyUserAlmace , ArtController.add);

// get
app.get('/query',auth.verifyUserAlmace , ArtController.query);
app.get('/queryCodigo',auth.verifyUser , ArtController.queryCodigo);
app.get('/list',auth.verifyUserAlmace , ArtController.list);

// put
app.put('/update',auth.verifyUserAlmace , ArtController.update);
app.put('/activate',auth.verifyUserAlmace , ArtController.activate);
app.put('/desactivate',auth.verifyUserAlmace , ArtController.desactivate);

// delete
app.delete('/remove',auth.verifyUserAlmace , ArtController.remove);

export default app;