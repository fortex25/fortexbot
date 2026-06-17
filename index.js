require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Fortex Bot is running!');
});

app.post('/webhook', (req, res) => {
    console.log('Webhook received!');
    console.log(req.body);

    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});