const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleEngineering(
    session,
    text,
    from
) {

    // Engineering courses

    if (session.step === 'engineering_courses') {

        if (text === 'engineering_other') {

            session.step = 'other_engineering';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                session.businessNumber,
                `💻 Great choice!

Please type the engineering course you're interested in.`
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    // Other engineering course

    if (session.step === 'other_engineering') {

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    return false;
}

module.exports = {
    handleEngineering
};