const {
    sendStateList,
    sendPercentageList,
    sendWhatsAppMessage
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleAdmission(
    session,
    text,
    from
) {

    // Admission Year

    if (session.step === 'admission_year') {

        session.admissionYear = text;

        session.step = 'state';

        await saveSession(from, session);

        await sendStateList(from);

        return true;
    }

    // State

    if (session.step === 'state') {

        session.state = text;

        session.step = 'percentage';

        await saveSession(from, session);

        await sendPercentageList(from);

        return true;
    }

    // Percentage

    if (session.step === 'percentage') {

        session.percentage = text;

        session.step = 'sslc_marksheet';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            session.businessNumber,
            `📄 Great!

Please upload your SSLC (10th) mark sheet.`
        );

        return true;
    }

    return false;
}

module.exports = {
    handleAdmission
};