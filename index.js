require('dotenv').config();

const express = require('express');
const {
    sendWhatsAppMessage,
    sendMainMenuButtons,
    sendStreamList,
    sendMedicalCoursesList,
    sendAdmissionYearButtons,
    sendStateList,
    sendPercentageList
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

        const hasDocument = message.type === 'document';
        const hasImage = message.type === 'image';

        const from = message.from;

        const text =
            message.text?.body ||
            message.interactive?.list_reply?.id ||
            message.interactive?.button_reply?.id ||
            '';

        console.log('TEXR RECIEVED', text);
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
                 `👋 Hi there!

                  Welcome to Fortex Education.

                  I'm Texa 😊, here to help you explore colleges, courses, admissions, and career options.

                  Whether you're a student, parent, or guardian, I'll guide you through the process and help you find the right path for your future.

                  I can help you with:

                  🎓 Admission Assistance
                  📊 Admission Chances
                  🧑‍🎓 Career Counseling

                  Let's get started!

                  ✨ May I know your name?`
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
                `Nice to meet you, ${session.name}! 😊\n\n📍 Which place are you from?`
            );

            return res.status(200).send('OK');
        }

        //PARENT NUMBER 
        if (session.step === 'place') {

          const phone = text.replace(/\D/g, '');

          if (phone.length !== 10) {

              await sendWhatsAppMessage(
                  from,
                  `Perfect! 👍\n\nTo help you better, please share a parent or guardian contact number.\n\n📱 Enter a valid 10-digit mobile number.`
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
        session.step = 'medical_courses';

        await saveSession(from, session);

        await sendMedicalCoursesList(from);

        return res.status(200).send('OK');
    }

    if (text === 'other_stream') {

        session.step = 'other_course';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            'Please type the course you are interested in.'
        );

        return res.status(200).send('OK');
    }

    return res.status(200).send('OK');
  }

  if (session.step === 'medical_courses') {

    if (text === 'medical_other') {

        session.step = 'other_course';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            'Please type the course you are interested in.'
        );


        return res.status(200).send('OK');
    }
    if (
        text === 'mbbs' ||
        text === 'bds' ||
        text === 'bams' ||
        text === 'bhms' ||
        text === 'bpt' ||
        text === 'bsc_nursing' ||
        text === 'allied_health' ||
        text === 'bpharm'
    ) {

        session.course = text;
        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return res.status(200).send('OK');
    }

    // Any normal medical course selected
    session.course = text;

    await saveSession(from, session);

    session.course = text;
    session.step = 'admission_year';

    await saveSession(from, session);

    await sendAdmissionYearButtons(from);

    return res.status(200).send('OK');

  }

  if (session.step === 'other_course') {

      session.course = text;

      session.step = 'admission_year';

      await saveSession(from, session);

      await sendAdmissionYearButtons(from);

      return res.status(200).send('OK');
  }
  if (session.step === 'admission_year') {

    session.admissionYear = text;

    session.step = 'state';

    await saveSession(from, session);

    await sendStateList(from);

    return res.status(200).send('OK');
  }
  if (session.step === 'state') {

    session.state = text;

    session.step = 'percentage';

    await saveSession(from, session);

    await sendPercentageList(from);

    return res.status(200).send('OK');
}

// PERCENTAGE

if (session.step === 'percentage') {

    session.percentage = text;

    session.step = 'sslc_marksheet';

    await saveSession(from, session);

    await sendWhatsAppMessage(
        from,
        `📄 Great!

Please upload your SSLC (10th) mark sheet.`
    );

    return res.status(200).send('OK');
}

// SSLC

if (session.step === 'sslc_marksheet') {

    if (!hasDocument && !hasImage) {

        await sendWhatsAppMessage(
            from,
            `📎 Please upload your SSLC mark sheet to continue.`
        );

        return res.status(200).send('OK');
    }

    session.sslcReceived = true;

    session.step = 'plus_two_marksheet';

    await saveSession(from, session);

    await sendWhatsAppMessage(
        from,
        `📚 Thanks!

Now please upload your Plus One or Plus Two mark sheet.`
    );

    return res.status(200).send('OK');
}

// PLUS ONE / PLUS TWO

if (session.step === 'plus_two_marksheet') {

    if (!hasDocument && !hasImage) {

        await sendWhatsAppMessage(
            from,
            `📎 Please upload your Plus One or Plus Two mark sheet to continue.`
        );

        return res.status(200).send('OK');
    }

    session.plusTwoReceived = true;

    session.step = 'id_proof';

    await saveSession(from, session);

    await sendWhatsAppMessage(
        from,
        `🪪 Almost done!

Please upload any valid ID proof.`
    );

    return res.status(200).send('OK');
}

// ID PROOF

if (session.step === 'id_proof') {

    if (!hasDocument && !hasImage) {

        await sendWhatsAppMessage(
            from,
            `📎 Please upload your ID proof to continue.`
        );

        return res.status(200).send('OK');
    }

    session.idProofReceived = true;

    await saveSession(from, session);

    await sendWhatsAppMessage(
        from,
`🎉 Thank you, ${session.name}!

Your enquiry has been successfully submitted.

Our admission team will get in touch with you soon to assist you with the next steps.

Have a great day! 😊

Team Fortex Education 💙`

    );

    session.step = 'start';

    await saveSession(from, session);

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