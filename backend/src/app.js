const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const path = require('path');

const routes = require('./app/routes/index.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
app.use(errors());

module.exports = app;
