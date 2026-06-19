const redis = require('./redis');

async function getSession(phone) {
    const data = await redis.get(`user:${phone}`);

    if (!data) {
        return {
            step: 'start'
        };
    }

    return JSON.parse(data);
}

async function saveSession(phone, session) {
    await redis.set(
        `user:${phone}`,
        JSON.stringify(session)
    );
}

module.exports = {
    getSession,
    saveSession
};