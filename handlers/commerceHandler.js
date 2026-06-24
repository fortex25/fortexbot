const {
    sendWhatsAppMessage,
    sendAdmissionYearButtons
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleCommerce(
    session,
    text,
    from
) {

    if (session.step === 'commerce_courses') {

        if (text === 'commerce_other') {

            session.step = 'other_commerce';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                session.businessNumber,
                `📊 Great!

Please type the commerce course you're interested in.`
            );

            return true;
        }

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    if (session.step === 'other_commerce') {

        session.course = text;

        session.step = 'admission_year';

        await saveSession(from, session);

        await sendAdmissionYearButtons(from);

        return true;
    }

    return false;
}

module.exports = {
    handleCommerce
};