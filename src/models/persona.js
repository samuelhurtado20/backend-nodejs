import {Schema, model} from 'mongoose'

const PersonaSchema = new Schema({
    tipo_persona:   {type:String, maxlength:30, required:true},
    nombre:         {type:String, maxlength:70, required:true},
    tipo_documento: {type:String, maxlength:30, required:true},
    num_documento:  {type:Number, maxlength:15, required:true, unique:true},
    direccion:      {type:String, maxlength:60, required:true},
    telefono:       {type:Number, maxlength:12, required:true, unique:true},
    email:          {type:String, maxlength:30, required:true, unique:true},
    estado:         {type:Number, default:1},
    createAt:       {type:Date, default:Date.now}
})

const Persona = model('personaschema',PersonaSchema );

export default Persona;