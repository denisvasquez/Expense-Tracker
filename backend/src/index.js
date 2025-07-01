require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// config
app.set('port', process.env.PORT || 3000);

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));

// router
app.use('/api/auth', require('./modules/auth/auth.router'));

// start server
app.listen(app.get('port'));
