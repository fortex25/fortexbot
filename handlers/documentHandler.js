const {
    sendWhatsAppMessage
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleDocuments(
    session,
    from,
    hasDocument,
    hasImage
) {

    // SSLC

    if (session.step === 'sslc_marksheet') {

        if (!hasDocument && !hasImage) {

            await sendWhatsAppMessage(
                from,
                `📎 Please upload your SSLC mark sheet to continue.`
            );

            return true;
        }

        session.sslcReceived = true;

        session.step = 'plus_two_marksheet';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            `📚 Thank you!

Please upload your Plus One or Plus Two mark sheet.`
        );

        return true;
    }

    // PLUS TWO

    if (session.step === 'plus_two_marksheet') {

        if (!hasDocument && !hasImage) {

            await sendWhatsAppMessage(
                from,
                `📎 Please upload your Plus One or Plus Two mark sheet to continue.`
            );

            return true;
        }

        session.plusTwoReceived = true;

        session.step = 'id_proof';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            `🪪 Almost done!

Please upload any valid ID proof.`
        );

        return true;
    }

    // ID PROOF

    if (session.step === 'id_proof') {

        if (!hasDocument && !hasImage) {

            await sendWhatsAppMessage(
                from,
                `📎 Please upload your ID proof to continue.`
            );

            return true;
        }

        session.idProofReceived = true;

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
`🎉 Thank you, ${session.name}!

Your enquiry has been successfully submitted.

Our admission team will contact you shortly to guide you through the next steps.

Team Fortex Education 💙`
        );

        session.step = 'start';

        await saveSession(from, session);

        return true;
    }

    return false;
}

module.exports = {
    handleDocuments
};