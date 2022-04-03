//const express = require('express');
//const morgan  = require('morgan');
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import router from './routes/app.js';

import pool from './settings/db.js';

const __dirname = path.resolve();
const app = express();
const corsOptions =
{
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}

app.set('port', process.env.PORT || 3000);
//
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
//
app.use('/api', cors(corsOptions), router);
//
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('server on port: ', app.get('port'))
});