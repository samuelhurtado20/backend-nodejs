import { Schema, model } from 'mongoose';

const ArticuloSchema = new Schema({
    categoria:       {type:Schema.ObjectId, ref:'categoriaschema'},
    codigo:          {type:String, maxlength:60, unique:true, required:true},
    nombre:          {type:String, maxlength:60, unique:true, required:true},
    descripcion:     {type:String, maxlength:255, required:true},
    precio_venta:    {type:Number, required:true},
    stock:           {type:Number, required:true},
    estado:          {type:Number, default:1},
    createAt:        {type:Date, default: Date.now}
})

const Articulo = model('articuloschema', ArticuloSchema);
export default Articulo;