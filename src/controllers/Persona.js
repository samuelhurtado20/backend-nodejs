import models from '../models/models';

let add = async (req, res, next) => {
    const {tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email} = req.body;
    try {
        const data = await models.Persona.create({
            tipo_persona,
            nombre,
            tipo_documento,
            num_documento,
            direccion,
            telefono,
            email
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let query  = async (req, res, next) => {
    let id = req.query._id;
    try {
        const data = await models.Persona.findOne({_id: id});
        if (!data) {
            res.status(404).send({
                message: "Error el registro no existe"
            })
        } else {
            res.status(200).json(data);
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let list  = async (req, res, next) => {
    let valor = req.query.valor;
    try {
        const data = await models.Persona.find({
            $or:[{'nombre': new RegExp(valor, 'i')},
            {'email': new RegExp(valor, 'i')}]
        },{createAt:0})
        .sort({'createAt': -1})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let listCliente  = async (req, res, next) => {
    let valor = req.query.valor;
    try {
        const data = await models.Persona.find({
            $or:[{'nombre': new RegExp(valor, 'i')},
            {'email': new RegExp(valor, 'i')}],
            'tipo_persona':'Cliente'
        },{createAt:0})
        .sort({'createAt': -1})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let listProveedor  = async (req, res, next) => {
    let valor = req.query.valor;
    try {
        const data = await models.Persona.find({
            $or:[{'nombre': new RegExp(valor, 'i')},
            {'email': new RegExp(valor, 'i')}],
            'tipo_persona':'Proveedor'
        },{createAt:0})
        .sort({'createAt': -1})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let update = async (req, res, next) => {
    const id = req.body._id;
    const {tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email}= req.body;
    try {
        const data = await models.Persona.findByIdAndUpdate({_id: id},{
            tipo_persona,
            nombre,
            tipo_documento,
            num_documento,
            direccion,
            telefono,
            email
        })
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let remove = async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Persona.findOneAndDelete({_id: id})
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let activate = async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Persona.findOneAndUpdate({_id: id}, {estado: 1} )
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

let desactivate = async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Persona.findOneAndUpdate({_id: id}, {estado: 0} )
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next();
    }
}

export default {
    add,
    query,
    list,
    listCliente,
    listProveedor,
    update,
    remove,
    activate,
    desactivate
}