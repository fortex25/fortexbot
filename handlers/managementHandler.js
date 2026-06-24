const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleManagement(
    session,
    text,
    from
) {

    if (session.step === 'management_courses') {

        if (text === 'management_other') {

            session.step = 'other_management';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                session.businessNumber,
                `💼 Great!

Please type the management course you're interested in.`
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from,
            session.businessNumber
        );

        return true;
    }

    if (session.step === 'other_management') {

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from,
            session.businessNumber
        );

        return true;
    }

    return false;
}

module.exports = {
    handleManagement
};