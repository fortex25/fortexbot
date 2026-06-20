require('dotenv').config();

const express = require('express');
const {
    sendWhatsAppMessage,
    sendMainMenuButtons,
    sendStreamList,
    sendMedicalCoursesList,
    sendAdmissionYearButtons,
    sendStateList,
    sendPercentageList,
    sendEngineeringCoursesList,
    sendManagementCoursesList,
    sendArtsCoursesList,
    sendCommerceCoursesList,
    sendLawCoursesList
} = require('./ycloud');

const {
    handleMedical
} = require('./handlers/medicalHandler');

const {
    handleAdmission
} = require('./handlers/admissionHandler');

const{
    handleDocuments
}=require('./handlers/documentHandler');

const {
    handleEngineering
} = require('./handlers/engineeringHandler');

const {
    handleManagement
} = require('./handlers/managementHandler');

const{
    handleArts
}=require('./handlers/artsHandler');

const{
    handleCommerce
}=require('./handlers/commerceHandler');

const{
    handleLaw
}=require('./handlers/lawHandler');

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

        const medicalHandled =await handleMedical(
                session,
                text,
                from
                );
        if (medicalHandled) {
            return res.status(200).send('OK');
        }

        const admissionHandled =await handleAdmission(
                session,
                text,
                from
            );
        if (admissionHandled) {
            return res.status(200).send('OK');
        }

        const documentHandled =
            await handleDocuments(
                session,
                from,
                hasDocument,
                hasImage
            );
        if(documentHandled){
            return res.status(200).send('OK');
        }
        
        const engineeringHandled =
            await handleEngineering(
            session,
            text,
            from
        );

        if (engineeringHandled) {
            return res.status(200).send('OK');
        }

        const managementHandled =
            await handleManagement(
                session,
                text,
                from
            );

        if (managementHandled) {
            return res.status(200).send('OK');
        }

        const artsHandled=
        await handleArts(
            session,
            text,
            from
        );
        if (artsHandled){
            return res.status(200).send('OK');
        }

        const commerceHandled=
            await handleCommerce(
                session,
                text,
                from
            )
        if (commerceHandled){
            return res.status(200).send('OK');
        }

        const lawHandled=
            await handleLaw(
                session,
                text,
                from
            )
        if (lawHandled){
            return res.status(200).send('OK');
        }

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

    if (text === 'engineering') {

        session.stream = 'Engineering';

        session.step = 'engineering_courses';

        await saveSession(from, session);

        await sendEngineeringCoursesList(from);

        return res.status(200).send('OK');
    }

    if (text === 'management') {

        session.stream = 'Management';

        session.step = 'management_courses';

        await saveSession(from, session);

        await sendManagementCoursesList(from);

        return res.status(200).send('OK');
    }

    if (text === 'arts_science') {

        session.stream = 'Arts & Science';

        session.step = 'arts_courses';

        await saveSession(from, session);

        await sendArtsCoursesList(from);

        return res.status(200).send('OK');
    }

    if (text === 'commerce') {

        session.stream = 'Commerce';

        session.step = 'commerce_courses';

        await saveSession(from, session);

        await sendCommerceCoursesList(from);

        return res.status(200).send('OK');
    }

    if (text === 'law') {

        session.stream = 'Law';

        session.step = 'law_courses';

        await saveSession(from, session);

        await sendLawCoursesList(from);

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