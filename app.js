const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const router = require('./config/routes');
const db = require('./config/db');

mongoose.connect(db.uri);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: '5gb' }));
app.use(bodyParser.json( {limit: '50mb'} ));

app.use(express.static(`${__dirname}/public`));
app.use(router);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
