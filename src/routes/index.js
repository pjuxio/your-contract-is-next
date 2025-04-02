const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

function setRoutes(app) {
    const filePath = path.join(__dirname, '../data/contracts.json');

    // Serve contracts data as JSON
    router.get('/api/contracts', (req, res) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading contracts file:', err);
                return res.status(500).json({ error: 'Failed to load contracts data' });
            }
            res.json(JSON.parse(data));
        });
    });

    // Render the index.ejs view
    router.get('/', (req, res) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading contracts file:', err);
                return res.status(500).send('Failed to load contracts data');
            }
            const contracts = JSON.parse(data);
            res.render('index', { contracts });
        });
    });

    app.use(router);
}

module.exports = { setRoutes };