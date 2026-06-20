const {
    sendInterestList,
    sendGuidanceList,
    sendWhatsAppMessage
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleCareer(
    session,
    text,
    from
) {

    if (session.step === 'career_counseling') {

        session.qualification = text;

        session.step = 'career_interest';

        await saveSession(from, session);

        await sendInterestList(from);

        return true;
    }

    if (session.step === 'career_interest') {

        session.interest = text;

        session.step = 'career_guidance';

        await saveSession(from, session);

        await sendGuidanceList(from);

        return true;
    }

    if (session.step === 'career_guidance') {

        session.guidance = text;

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
`🎉 Thank you, ${session.name}!

Our career counselor will contact you shortly and help you choose the right career path.

Team Fortex Education 💙`
        );

        session.step = 'start';

        await saveSession(from, session);

        return true;
    }

    return false;
}

module.exports = {
    handleCareer
};