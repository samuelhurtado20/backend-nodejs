import {Schema, model} from 'mongoose'

const CategoriaSchema = new Schema({
    nombre:      {type:String, maxlength:60, required:true},
    descripcion: {type:String, maxlength:255, required:true},
    estado:      {type:Number, default:1},
    createAt:    {type:Date, default:Date.now}
})

const Categoria = model('categoriaschema',CategoriaSchema );

export default Categoria;