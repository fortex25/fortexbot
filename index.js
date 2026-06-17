require('dotenv').config();

console.log("TEST_VAR:",process.env.TEST_VAR);

console.log(
  "API KEY EXISTS:",
  !!process.env.YCLOUD_API_KEY
);

const express = require('express');
const { sendWhatsAppMessage } = require('./ycloud');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Fortex Bot is running!');
});

app.post('/webhook', async (req, res) => {
    console.log('Webhook received!');
    console.log(JSON.stringify(req.body, null, 2));

    try {
        const message = req.body.whatsappInboundMessage;

        if (message) {
            const from = message.from;
            const text = message.text?.body || '';

            console.log('From:', from);
            console.log('Text:', text);

            await sendWhatsAppMessage(
                from,
                'Hello from Fortex Bot!'
            );
        }

        res.status(200).send('OK');

    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(200).send('OK');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});