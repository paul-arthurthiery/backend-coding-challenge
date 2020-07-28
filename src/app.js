require('dotenv').config();
const resolvePath = require('path').resolve;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const suggestionsRouter = require('./routes/index');

const app = express();

app.use(cors({ origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/suggestions', suggestionsRouter);
app.use('/docs', express.static(resolvePath(__dirname, '../out')));
app.use('/coverage', express.static(resolvePath(__dirname, '../coverage/lcov-report')));

// catch 404 and forward to error handler
app.use((req, res) => res.status(404).send());
app.use(bodyParser.json());

module.exports = app;
