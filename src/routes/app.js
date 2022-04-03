import routerx from 'express-promise-router';
import Articulo from './articulo.js';
import Categoria from './categoria.js';
import Usuario from './usuario.js';
import Persona from './persona.js';
import Venta from './venta.js';
import Ingreso from './ingreso.js';

const router = routerx();
router.use('/articulo', Articulo);
router.use('/categoria', Categoria);
router.use('/usuario', Usuario);
router.use('/persona', Persona);
router.use('/venta', Venta);
router.use('/ingreso', Ingreso);
export default router;