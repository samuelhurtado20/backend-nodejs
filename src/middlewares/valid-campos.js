import {validationResult} from 'express-validator';

let validCampos = async (req, res, next) => {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
        return res.status(404).json(err)
    }
    next();
}

export default {
    validCampos
}