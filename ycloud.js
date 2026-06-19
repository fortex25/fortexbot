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

```
    console.log('Message sent:', response.data);

} catch (error) {

    console.error(
        'YCloud Error:',
        error.response?.data || error.message
    );
}
```

}

async function sendMainMenuList(to) {

```
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
                    text: 'Vortex Education'
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
                                    description: 'Get admission guidance'
                                },
                                {
                                    id: 'admission_chances',
                                    title: 'Check Admission Chances',
                                    description: 'Analyze rank, score or marks'
                                },
                                {
                                    id: 'career_counseling',
                                    title: 'Career Counseling',
                                    description: 'Get expert career advice'
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

    console.log('List Message Sent:', response.data);

} catch (error) {

    console.error(
        'List Message Error:',
        error.response?.data || error.message
    );
}
```

}

module.exports = {
sendWhatsAppMessage,
sendMainMenuList
};
