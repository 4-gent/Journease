const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formData = require('form-data');
const http = require('http');

const app = express();
const PORT = process.env.PORT

const httpServer = http.createServer(app);

httpServer.listen()