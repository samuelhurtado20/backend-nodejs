import jwt from 'jsonwebtoken';
import models from '../models/models';

async function checkToken(token){
    let data = null;
    try {
        const {_id} = await jwt.decode(token);
        data = _id;
    } catch (e) {
        return false;
    }
    const user = await models.Usuario.findOne({_id: data, estado:1})
    if (user) {
        const token = await jwt.sign({_id: data}, 'akldioqdafnlhfaopwaslhf', {expiresIn: '1d'})
        return {token, rol: user.rol}
    } else {
        return false
    }
}

let encode = async (_id) =>{
    const token = await jwt.sign({_id: _id}, 'akldioqdafnlhfaopwaslhf', {expiresIn: '1d'})
}

let decode = async (token) => {
    try {
        const {_id} = await jwt.verify(token, 'akldioqdafnlhfaopwaslhf')
        const user = await models.Usuario.findOne({_id, estado:1})
        if (user) {
            return user
        } else {
            return false
        }
    } catch (e) {
        const newToken = await checkToken(token)
        return newToken;
    }
}


export default {
    encode,
    decode
}