import routerx from 'express-promise-router';
import CatController from '../controllers/Categoria';
import auth from '../middlewares/auth'


const app = routerx();
// post
app.post('/add',auth.verifyUserAlmace , CatController.add);
// get
app.get('/query',auth.verifyUserAlmace , CatController.query);
app.get('/list',auth.verifyUserAlmace , CatController.list);
// put
app.put('/update',auth.verifyUserAlmace , CatController.update);
app.put('/activate',auth.verifyUserAlmace , CatController.activate);
app.put('/desactivate',auth.verifyUserAlmace , CatController.desactivate);

// delete
app.delete('/remove',auth.verifyUserAlmace , CatController.remove);

export default app;