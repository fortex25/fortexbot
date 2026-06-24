const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleArts(
    session,
    text,
    from
) {

    if (session.step === 'arts_courses') {

        if (text === 'arts_other') {

            session.step = 'other_arts';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                session.businessNumber,
                'Please type the course you are interested in.'
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    if (session.step === 'other_arts') {

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    return false;
}

module.exports = {
    handleArts
};