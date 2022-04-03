import models from '../models/models';

async function aumentStock(id_articulo, cantidad){
    let {stock} = await models.Articulo.findOne({_id: id_articulo})
    let newStock = parseInt(stock) + parseInt(cantidad)
    const data = await models.Articulo.findByIdAndUpdate({_id: id_articulo}, {stock: newStock})
}

async function dismStock(id_articulo, cantidad){
    let {stock} = await models.Articulo.findOne({_id: id_articulo})
    let newStock = parseInt(stock) - parseInt(cantidad)
    const data = await models.Articulo.findByIdAndUpdate({_id: id_articulo}, {stock: newStock})
}

export default {
    aumentStock,
    dismStock
}