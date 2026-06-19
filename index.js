require('dotenv').config();

const express = require('express');
const { sendWhatsAppMessage } = require('./ycloud');
const { getSession, saveSession } = require('./session');

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
        const text = message.text?.body || '';

        console.log('From:', from);
        console.log('Text:', text);

        const session = await getSession(from);

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

        if (session.step === 'place') {

            session.place = text;
            session.step = 'menu';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                `Thank you ${session.name} 😊

How can we help you today?

1. Admission Assistance
2. Check Admission Chances
3. Career Counseling

Reply with 1, 2 or 3.`
            );

            return res.status(200).send('OK');
        }

        if (session.step === 'menu') {

            if (text === '1') {

                await sendWhatsAppMessage(
                    from,
                    'Admission Assistance selected.'
                );

            } else if (text === '2') {

                await sendWhatsAppMessage(
                    from,
                    'Check Admission Chances selected.'
                );

            } else if (text === '3') {

                await sendWhatsAppMessage(
                    from,
                    'Career Counseling selected.'
                );

            } else {

                await sendWhatsAppMessage(
                    from,
                    'Please reply with 1, 2 or 3.'
                );
            }

            return res.status(200).send('OK');
        }

        return res.status(200).send('OK');

    } catch (error) {

        console.error('Webhook Error:', error);

        return res.status(200).send('OK');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});