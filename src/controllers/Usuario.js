import models from '../models/models';
import helpers from './helpers';
import token from '../services/token';

let add = async (req, res, next) => {
    const {rol, nombre, tipo_documento, num_documento, direccion, telefono, email, Password } = req.body;  
    const password = await helpers.encryptPassword(Password);
    console.log(password)
    try {
        const data = await models.Usuario.create({
            rol, 
            nombre,
            tipo_documento,
            num_documento,
            direccion,
            telefono,
            email,
            password
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let query = async (req, res, next) => {
    let id = req.query._id;
    try {
        const data = await models.Usuario.findOne({_id: id})
        if (!data) {
            res.status(404).send({
                message: "Error el archivo no existe"
            })
        } else {
            res.status(200).json(data);
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let list = async (req, res, next) => {
    let valor = req.query.valor;
    try {
        const data = await models.Usuario.find({
            $or:[{'nombre': new RegExp(valor,'i')},
            {'email': new RegExp(valor,'i')}]
        },{createAt:0})
        .sort({'createAt':-1});
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let update = async (req, res, next) => {
    const id = req.body._id;
    const {rol, nombre, tipo_documento, num_documento, direccion, telefono, email, Password, estado } = req.body;  
    const reg = await models.Usuario.findOne({_id : id});
    const password = '';
    try {
        if (Password != reg.password) {
            password = await helpers.encryptPassword(Password);
        } else {
            password = Password;
        }
        const data = await models.Usuario.findByIdAndUpdate({_id:id},{
            rol,
            nombre,
            tipo_documento,
            num_documento,
            direccion,
            telefono,
            email, 
            password,
            estado
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let remove = async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Usuario.findByIdAndDelete({_id:id})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let activate = async (req, res, next) => {
    const id = req.body._id; 
    try {
        const data = await models.Usuario.findByIdAndUpdate({_id: id}, {estado:1})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}
let desactivate = async  (req, res, next) => {
    const id = req.body._id; 
    try {
        const data = await models.Usuario.findByIdAndUpdate({_id: id}, {estado:0})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let login = async (req, res, next) => {
    const {email, Password} = req.body;
    try {
        let user = await models.Usuario.findOne({email: email, estado:1})
        if (user) {
            let match = await helpers.matchPassword(Password, user.password);
            if (match) {
                let TokenReturn = await token.encode(user._id);
                res.status(200).json(user, TokenReturn)
            } else {
                res.status(404).send({
                    message: 'Error en el proceso'
                })
            }
        } else {
            res.status(404).send({
                message: 'El usuario no existe'
            })
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

export default {
    add,
    query,
    list,
    update,
    remove,
    activate,
    desactivate,
    login
}