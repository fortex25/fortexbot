const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleAviation(
    session,
    text,
    from
) {

    if (session.step === 'aviation_courses') {

        if (text === 'aviation_other') {

            session.step = 'other_aviation';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                session.businessNumber,
                `✈ Great!

Please type the aviation course you're interested in.`
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from),
        session.businessNumber;

        return true;
    }

    if (session.step === 'other_aviation') {

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
    handleAviation
};