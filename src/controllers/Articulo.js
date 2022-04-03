import models from '../models/models';

let add = async (req, res, next) => {
    const { categoria, codigo, nombre, descripcion, precio_venta, stock } = req.body;
    try {
        const data = await models.Articulo.create({
            categoria,
            codigo,
            nombre,
            descripcion,
            precio_venta,
            stock
        })
        res.status(200).json(data)
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
        const data = await models.Articulo.findOne({_id: id})
        .populate('categoria',{nombre:1})
        if (!data) {
            res.status(404).send({
                message: "Error el achivo no existe"
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

let queryCodigo = async (req, res, next) => {
    let code = req.query.codigo;
    try {
        const data = await models.Articulo.findOne({codigo: code})
        .populate('categoria',{nombre:1})
        if (!data) {
            res.status(404).send({
                message: "Error el achivo no existe"
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

let list = async (req, res, next) => {
    const valor = req.query.valor;
    try {
        const data = await models.Articulo.find({
            $or:[{'nombre': RegExp(valor, 'i')},
            {'descripcion': RegExp(valor, 'i')}]
        },{createAt:0})
        .populate('categoria',{nombre:1})
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
    const { codigo, nombre, descripcion, precio_venta, stock } = req.body;
    try {
        const data = await models.Articulo.findByIdAndUpdate({_id: id}, {
            codigo,
            nombre,
            descripcion,
            precio_venta,
            stock
        })
        res.status(200).json(data)
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
        const data = await models.Articulo.findByIdAndDelete({_id: id})
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let activate =  async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Articulo.findByIdAndUpdate({_id : id},{estado:1})
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}
let desactivate = async (req, res, next) => {
    const id = req.body._id;
    try {
        const data = await models.Articulo.findByIdAndUpdate({_id : id},{estado:0})
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
    queryCodigo,
    list,
    update,
    remove,
    activate,
    desactivate
}