

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const formData = require('form-data');
const http = require('http');
const MongoClient= require('mongodb').MongoClient;
const axios = require('axios');
const { error } = require('console');
const cors = require('cors');


require('dotenv').config()

const app = express();

app.use(cors())
const PORT = process.env.PORT

const httpServer = http.createServer(app);

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})

const database = process.env.DATABASE_NAME;
const response_collection = process.env.COLLECTION_NAME;

app.use(express.static(path.join(__dirname, "../frontend/public/")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/directions', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Missing prompt' });
    }

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: prompt,
                key: process.env.GOOGLE_API_KEY
            }
        });

        if (response.data.status !== 'OK') {
            return res.status(400).json({ error: response.data.error_message || 'Invalid request' });
        }

        const location = response.data.results[0].geometry.location;
        const { lat, lng } = location
        res.json({ lat, lng })
        console.log({ lat, lng });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// dashboard query after single sign on and ml processing
app.post('/dashboard', async (req, res) => {
    try {
        await client.connect();
        const data = client.db(database);
        const response = data.collection(response_collection);
        const result = await response.find().toArray();
        console.log(data);

        const speed_dial = {
            
        }

        const recommended = {

        }

        res.send(recommended);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../frontend/public/', 'index.html'));
})

httpServer.listen(PORT, () => {
    console.log('Starting on port: ', PORT)
})