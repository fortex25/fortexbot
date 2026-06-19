const axios = require('axios');

async function sendWhatsAppMessage(to, text) {
    try {
        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: process.env.PHONE_NUMBER,
                to: to,
                type: 'text',
                text: {
                    body: text
                }
            },
            {
                headers: {
                    'X-API-Key': process.env.YCLOUD_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Message sent:', response.data);

    } catch (error) {
        console.error(
            'YCloud Error:',
            error.response?.data || error.message
        );
    }
}

module.exports = {
    sendWhatsAppMessage
};