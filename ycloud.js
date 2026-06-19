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

async function sendMainMenuList(to) {
    try {
        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: process.env.PHONE_NUMBER,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Fortex Education'
                    },
                    body: {
                        text: 'How can we help you today?'
                    },
                    footer: {
                        text: 'Please select an option'
                    },
                    action: {
                        button: 'View Options',
                        sections: [
                            {
                                title: 'Our Services',
                                rows: [
                                    {
                                        id: 'admission_assistance',
                                        title: 'Admission Assistance',
                                        description: 'Admission guidance'
                                    },
                                    {
                                        id: 'admission_chances',
                                        title: 'Check Admission Chances',
                                        description: 'Rank analysis'
                                    },
                                    {
                                        id: 'career_counseling',
                                        title: 'Career Counseling',
                                        description: 'Career guidance'
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                headers: {
                    'X-API-Key': process.env.YCLOUD_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('List sent:', response.data);

    } catch (error) {
        console.error(
            'List Error:',
            error.response?.data || error.message
        );
    }
}
async function sendMainMenuButtons(to) {
    try {
        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: process.env.PHONE_NUMBER,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: 'How can we help you today?'
                    },
                    action: {
                        buttons: [
                            {
                                type: 'reply',
                                reply: {
                                    id: 'admission_assistance',
                                    title: 'Admission'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'admission_chances',
                                    title: 'Chances'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'career_counseling',
                                    title: 'Counseling'
                                }
                            }
                        ]
                    }
                }
            },
            {
                headers: {
                    'X-API-Key': process.env.YCLOUD_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Buttons sent:', response.data);

    } catch (error) {

        console.error(
            'Button Error:',
            error.response?.data || error.message
        );
    }
}
async function sendStreamList(to) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: process.env.PHONE_NUMBER,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Admission Assistance'
                    },
                    body: {
                        text: 'Select your preferred stream'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Stream',
                        sections: [
                            {
                                title: 'Available Streams',
                                rows: [
                                    {
                                        id: 'medical',
                                        title: 'Medical'
                                    },
                                    {
                                        id: 'engineering',
                                        title: 'Engineering'
                                    },
                                    {
                                        id: 'management',
                                        title: 'Management'
                                    },
                                    {
                                        id: 'arts_science',
                                        title: 'Arts & Science'
                                    },
                                    {
                                        id: 'commerce',
                                        title: 'Commerce'
                                    },
                                    {
                                        id: 'law',
                                        title: 'Law'
                                    },
                                    {
                                        id: 'aviation',
                                        title: 'Aviation'
                                    },
                                    {
                                        id: 'other_stream',
                                        title: 'Other'
                                    }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                headers: {
                    'X-API-Key': process.env.YCLOUD_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Stream List Sent:', response.data);

    } catch (error) {

        console.error(
            'Stream List Error:',
            error.response?.data || error.message
        );
    }
}

module.exports = {
    sendWhatsAppMessage,
    sendMainMenuButtons,
    sendStreamList
};