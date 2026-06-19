require('dotenv').config();

const express = require('express');
const {
    sendWhatsAppMessage,
    sendMainMenuButtons,
    sendStreamList,
    sendMedicalCoursesList
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
            message.interactive?.list_reply?.id ||
            message.interactive?.button_reply?.id ||
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

            session.step = 'parent_name';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                'Please enter Parent / Guardian Name.'
            );

            return res.status(200).send('OK');
        }

        //PARENT

        if (session.step === 'parent_name') {

            session.parentName = text;

            session.step = 'parent_phone';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                'Please enter Parent / Guardian Contact Number.'
            );

            return res.status(200).send('OK');
        }
        //PARENT NUMBER 
        if (session.step === 'parent_phone') {

          const phone = text.replace(/\D/g, '');

          if (phone.length !== 10) {

              await sendWhatsAppMessage(
                  from,
                  'Please enter a valid 10-digit Parent / Guardian Contact Number.'
              );

              return res.status(200).send('OK');
          }

          session.parentPhone = phone;

          session.step = 'menu';

          await saveSession(from, session);

          await sendWhatsAppMessage(
              from,
              `Thank you ${session.name} 😊`
          );

          await sendMainMenuButtons(from);

          return res.status(200).send('OK');
      }
        // MENU

        if (session.step === 'menu') {

    if (text === 'admission_assistance') {

        session.step = 'stream_selection';

        await saveSession(from, session);

        await sendStreamList(from);

        return res.status(200).send('OK');
    }
    if (text === 'admission_chances') {

        await sendWhatsAppMessage(
            from,
            '📊 Check Admission Chances Selected'
        );

        session.step = 'admission_chances';

        await saveSession(from, session);

        return res.status(200).send('OK');
    }

    if (text === 'career_counseling') {

        await sendWhatsAppMessage(
            from,
            '🧑‍🎓 Career Counseling Selected'
        );

        session.step = 'career_counseling';

        await saveSession(from, session);

        return res.status(200).send('OK');
    }

    return res.status(200).send('OK');
  }
  if (session.step === 'stream_selection') {

    if (text === 'medical') {

        session.stream = 'Medical';

        await saveSession(from, session);

        await sendMedicalCoursesList(from);

        return res.status(200).send('OK');
    }

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