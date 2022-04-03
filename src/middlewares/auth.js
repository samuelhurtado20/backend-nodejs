import tokenServer from '../services/token';

let verifyUser = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error No se tiene un token - user"
        });
    } 
    const resp = await tokenServer.decode(req.headers.token)
    if (resp.rol == 'Administrador'||resp.rol == 'Vendedor'||resp.rol == 'Almacenero') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

let verifyUserAdmin = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error No se tiene un token - user"
        });
    } 
    const resp = await tokenServer.decode(req.headers.token)
    if (resp.rol == 'Administrador') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

let verifyUserAlmace = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error No se tiene un token - user"
        });
    } 
    const resp = await tokenServer.decode(req.headers.token)
    if (resp.rol == 'Administrador'||resp.rol == 'Almacenero') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

let verifyUserVende = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(404).send({
            message: "Error No se tiene un token - user"
        });
    } 
    const resp = await tokenServer.decode(req.headers.token)
    if (resp.rol == 'Administrador'||resp.rol == 'Vendedor') {
        next();
    } else {
        return res.status(403).send({
            message: 'Error Sin autorizacion'
        })
    }
}

export default {
    verifyUser,
    verifyUserAdmin,
    verifyUserAlmace,
    verifyUserVende
}