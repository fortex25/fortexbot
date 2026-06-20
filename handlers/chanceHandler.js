const {
    sendWhatsAppMessage
} = require('../ycloud');

const {
    saveSession
} = require('../session');

async function handleChance(
    session,
    text,
    from
) {

    if (session.step === 'admission_chances') {

        if (text === 'other_exam') {

            session.step = 'other_exam_name';

            await saveSession(from, session);

            await sendWhatsAppMessage(
                from,
                `📝 Please enter the name of the entrance exam or qualifying exam.`
            );

            return true;
        }

        session.analysisType = text;

        session.step = 'chance_score';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            `📈 Great!

Please enter your score or rank.`
        );

        return true;
    }

    if (session.step === 'other_exam_name') {

        session.examName = text;

        session.step = 'chance_score';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            `📈 Thank you!

Please enter your score or rank.`
        );

        return true;
    }

    if (session.step === 'chance_score') {

        session.score = text;

        session.step = 'chance_course';

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
            `🎓 Which course are you interested in?

Please type your preferred course.`
        );

        return true;
    }

    if (session.step === 'chance_course') {

        session.course = text;

        await saveSession(from, session);

        await sendWhatsAppMessage(
            from,
`🎉 Thank you, ${session.name}!

Your admission chance request has been submitted successfully.

Our admission team will analyze your admission chances and contact you shortly.

Team Fortex Education 💙`
        );

        session.step = 'start';

        await saveSession(from, session);

        return true;
    }

    return false;
}

module.exports = {
    handleChance
};