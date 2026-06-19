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
async function sendMedicalCoursesList(to) {
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
                        text: 'Medical Courses'
                    },
                    body: {
                        text: 'Select your preferred course'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Course',
                        sections: [
                            {
                                title: 'Medical Courses',
                                rows: [
                                    {
                                        id: 'mbbs',
                                        title: 'MBBS'
                                    },
                                    {
                                        id: 'bds',
                                        title: 'BDS'
                                    },
                                    {
                                        id: 'bams',
                                        title: 'BAMS'
                                    },
                                    {
                                        id: 'bhms',
                                        title: 'BHMS'
                                    },
                                    {
                                        id: 'bpt',
                                        title: 'BPT'
                                    },
                                    {
                                        id: 'bsc_nursing',
                                        title: 'BSc Nursing'
                                    },
                                    {
                                        id: 'allied_health',
                                        title: 'Allied Health Sciences'
                                    },
                                    {
                                        id: 'bpharm',
                                        title: 'B.Pharm'
                                    },
                                    {
                                        id: 'medical_other',
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

        console.log('Medical Course List Sent:', response.data);

    } catch (error) {

        console.error(
            'Medical Course List Error:',
            error.response?.data || error.message
        );
    }
}
async function sendAdmissionYearButtons(to) {
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
                        text: 'Which admission year are you planning for?'
                    },
                    action: {
                        buttons: [
                            {
                                type: 'reply',
                                reply: {
                                    id: 'this_year',
                                    title: 'This Year'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'upcoming_year',
                                    title: 'Upcoming Year'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'just_exploring',
                                    title: 'Exploring'
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

        console.log('Admission Year Buttons Sent:', response.data);

    } catch (error) {

        console.error(
            'Admission Year Error:',
            error.response?.data || error.message
        );
    }
}
async function sendStateList(to) {
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
                        text: 'Preferred State'
                    },
                    body: {
                        text: 'Which state are you interested in?'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select State',
                        sections: [
                            {
                                title: 'Available Options',
                                rows: [
                                    {
                                        id: 'kerala',
                                        title: 'Kerala'
                                    },
                                    {
                                        id: 'karnataka',
                                        title: 'Karnataka'
                                    },
                                    {
                                        id: 'tamil_nadu',
                                        title: 'Tamil Nadu'
                                    },
                                    {
                                        id: 'any_state',
                                        title: 'Any State'
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

        console.log('State List Sent:', response.data);

    } catch (error) {

        console.error(
            'State List Error:',
            error.response?.data || error.message
        );
    }
}
async function sendBudgetList(to) {
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
                        text: 'Budget Preference'
                    },
                    body: {
                        text: 'What is your approximate budget?'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Budget',
                        sections: [
                            {
                                title: 'Budget Options',
                                rows: [
                                    {
                                        id: 'below_5_lakhs',
                                        title: 'Below ₹5 Lakhs'
                                    },
                                    {
                                        id: '5_to_10_lakhs',
                                        title: '₹5 - 10 Lakhs'
                                    },
                                    {
                                        id: '10_to_20_lakhs',
                                        title: '₹10 - 20 Lakhs'
                                    },
                                    {
                                        id: 'above_20_lakhs',
                                        title: 'Above ₹20 Lakhs'
                                    },
                                    {
                                        id: 'not_sure_budget',
                                        title: 'Not Sure'
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

        console.log('Budget List Sent:', response.data);

    } catch (error) {

        console.error(
            'Budget List Error:',
            error.response?.data || error.message
        );
    }
}

module.exports = {
    sendWhatsAppMessage,
    sendMainMenuButtons,
    sendStreamList,
    sendMedicalCoursesList,
    sendAdmissionYearButtons,
    sendStateList,
    sendBudgetList
};