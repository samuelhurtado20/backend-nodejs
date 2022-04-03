import models from '../models/models';
import controler from './controllerStock';

let add = async ( req, res, next) => {
    const { usuario, persona, tipo_comprobante, serie_comprobante, impuesto, total, detalle} = req.body;
    try {
        const data = await models.Ingreso.create({
            usuario,
            persona,
            tipo_comprobante,
            serie_comprobante,
            impuesto,
            total,
            detalle
        })    
        let detalles = req.body.detalle;
        detalles.map(function(x){
            controler.dismStock(x._id, x.cantidad)
        })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let query = async ( req, res, next) => {
    let id = req.query._id;
    try {
        const data = await models.Ingreso.findOne({_id: id})
        .populate('usuario', {nombre:1})
        .populate('persona', {nombre:1})
        if (!data) {
            res.status(404).send({
                message: "Error el registro no existe"
            })
        } else {
            res.status(200).json(data)
        }
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let list = async ( req, res, next) => {
    let valor = req.query.valor;
    try {
        const data = await models.Ingreso.find({
            $or:[{'serie_comprobante': new RegExp(valor, 'i')}]
        })
        .populate('usuario', {nombre:1})
        .populate('persona', {nombre:1})
        .sort({'createAt':-1})
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let activate = async ( req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Ingreso.findByIdAndUpdate({_id: id},{estado:1});
        let detalles = data.detalle;
        detalles.map(function(x){
            controler.aumentStock(x._id, x.cantidad)
        })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let desactivate = async ( req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Ingreso.findByIdAndUpdate({_id: id},{estado:0});
        let detalles = data.detalle;
        detalles.map(function(x){
            controler.dismStock(x._id, x.cantidad)
        })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let grafAnual = async ( req, res, next) => {
    try {
        const data = await models.Ingreso.aggregate([
            {
                $group:{
                    _id: {
                        mes: {$month: '$createAt'},
                        year:{$year: '$createAt'}
                    },
                    total: {$sum: '$total'},
                    numero:{$sum:1}
                }
            },
            {
                $sort:{
                    "_id.year": -1,
                    "_id.mes": -1
                }
            }
        ]).limit(12)
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let consultFecha = async ( req, res, next) => {
    let { valor, end } = req.query;
    try {
        const data = await models.Ingreso.find({
            'createAt': {"$gte": valor, "$lt": end}
        })
        .populate('usuario', {nombre:1})
        .populate('persona', {nombre:1})
        .sort({'createAt':-1})
        res.status(200).json(data)
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
    activate,
    desactivate,
    grafAnual,
    consultFecha
}