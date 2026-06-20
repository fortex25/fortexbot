const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleLaw(
    session,
    text,
    from
) {

    if (session.step === 'law_courses') {

        if (text === 'law_other') {

            session.step = 'other_law';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                'Please type the law course you are interested in.'
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    if (session.step === 'other_law') {

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    return false;
}

module.exports = {
    handleLaw
};