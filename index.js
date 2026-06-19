require('dotenv').config();

const express = require('express');
const {
    sendWhatsAppMessage,
    sendMainMenuList
} = require('./ycloud');

const {
    getSession,
    saveSession
} = require('./session');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Fortex Bot is running!');
});

app.post('/webhook', async (req, res) => {

    try {

        const message = req.body.whatsappInboundMessage;

        if (!message) {
            return res.status(200).send('OK');
        }

        const from = message.from;

        const text =
            message.text?.body ||
            '';

        console.log('Webhook Received');
        console.log(JSON.stringify(req.body, null, 2));

        const session = await getSession(from);

        // START

        if (
            text.toLowerCase() === 'hi' ||
            text.toLowerCase() === 'hello' ||
            session.step === 'start'
        ) {

            await sendWhatsAppMessage(
                from,
                '🎓 Welcome to Fortex Education!\n\nWhat is your name?'
            );

            session.step = 'name';

            await saveSession(from, session);

            return res.status(200).send('OK');
        }

        // NAME

        if (session.step === 'name') {

            session.name = text;

            session.step = 'place';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                'Great! Which place are you from?'
            );

            return res.status(200).send('OK');
        }

        // PLACE

        if (session.step === 'place') {

            session.place = text;

            session.step = 'menu';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                `Thank you ${session.name} 😊`
            );

            await sendMainMenuList(from);

            return res.status(200).send('OK');
        }

        // MENU

        if (session.step === 'menu') {

            await sendWhatsAppMessage(
                from,
                'Please select an option from the menu.'
            );

            return res.status(200).send('OK');
        }

        return res.status(200).send('OK');

    } catch (error) {

        console.error(
            'Webhook Error:',
            error
        );

        return res.status(200).send('OK');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});