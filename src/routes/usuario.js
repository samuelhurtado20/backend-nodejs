import routerx from 'express-promise-router';
import UserController from '../controllers/Usuario';
import {check} from 'express-validator';
import valid from '../middlewares/valid-campos';
import auth from '../middlewares/auth'

const app = routerx();

// post 
app.post('/add',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('Password', 'El password debe de tener mas de 5 caracteres').isLength({min:5, max: 16}),
    valid.validCampos,
    auth.verifyUserAdmin
], UserController.add );
app.post('/login', UserController.login );

// get
app.get('/query',auth.verifyUserAdmin, UserController.query);
app.get('/list',auth.verifyUserAdmin, UserController.list);

// put
app.put('/update',auth.verifyUserAdmin, UserController.update);
app.put('/activate',auth.verifyUserAdmin, UserController.activate);
app.put('/desactivate',auth.verifyUserAdmin, UserController.desactivate);

// delete
app.delete('/remove',auth.verifyUserAdmin, UserController.remove);

export default app;