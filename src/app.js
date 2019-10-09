const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('./lib/middleware/error-handler');
const upcomingEventsApp = require('./upcoming-events/routes');

app.use(cors());
app.use('/', upcomingEventsApp);
app.use(errorHandler());

module.exports = app;