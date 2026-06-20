const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleMedical(
    session,
    text,
    from
) {

    if (session.step === 'medical_courses') {

        if (text === 'medical_other') {

            session.step = 'other_course';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                `📚 Great!

Please type the course you're interested in.`
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    if (session.step === 'other_course') {

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    return false;
}

module.exports = {
    handleMedical
};