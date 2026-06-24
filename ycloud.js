const axios = require('axios');

async function sendWhatsAppMessage(to, 
    businessNumber,
    text) {
    try {
        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
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

async function sendMainMenuList(to,businessNumber) {
    try {
        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
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
async function sendMainMenuButtons(to,businessNumber) {
    try {
        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'button',
                    body: {
                        text: 'How can I help you today? 😊'
                    },
                    action: {
                        buttons: [
                            {
                                type: 'reply',
                                reply: {
                                    id: 'admission_assistance',
                                    title: '🎓Admission'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'admission_chances',
                                    title: '📈Score Analysis'
                                }
                            },
                            {
                                type: 'reply',
                                reply: {
                                    id: 'career_counseling',
                                    title: '🧑‍🎓Counseling'
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
async function sendStreamList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
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
async function sendMedicalCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
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
async function sendAdmissionYearButtons(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
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
async function sendStateList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
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
async function sendPercentageList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Academic Performance'
                    },
                    body: {
                        text:
`📈 This helps us suggest the best colleges for you.

What is your approximate percentage?`
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Percentage',
                        sections: [
                            {
                                title: 'Percentage Range',
                                rows: [
                                    {
                                        id: 'above_90',
                                        title: 'Above 90%'
                                    },
                                    {
                                        id: '80_90',
                                        title: '80% - 90%'
                                    },
                                    {
                                        id: '70_80',
                                        title: '70% - 80%'
                                    },
                                    {
                                        id: '60_70',
                                        title: '60% - 70%'
                                    },
                                    {
                                        id: 'below_60',
                                        title: 'Below 60%'
                                    },
                                    {
                                        id: 'results_awaited',
                                        title: 'Results Awaited'
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

        console.log(
            'Percentage List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Percentage List Error:',
            error.response?.data || error.message
        );
    }
}
async function sendEngineeringCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Engineering Courses'
                    },
                    body: {
                        text: 'Select your preferred engineering course'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Course',
                        sections: [
                            {
                                title: 'Engineering Courses',
                                rows: [
                                    {
                                        id: 'cse',
                                        title: 'Computer Science'
                                    },
                                    {
                                        id: 'ai_ds',
                                        title: 'AI & Data Science'
                                    },
                                    {
                                        id: 'cyber_security',
                                        title: 'Cyber Security'
                                    },
                                    {
                                        id: 'mechanical',
                                        title: 'Mechanical'
                                    },
                                    {
                                        id: 'civil',
                                        title: 'Civil'
                                    },
                                    {
                                        id: 'electrical',
                                        title: 'Electrical'
                                    },
                                    {
                                        id: 'electronics',
                                        title: 'Electronics'
                                    },
                                    {
                                        id: 'engineering_other',
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

        console.log(
            'Engineering List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Engineering Error:',
            error.response?.data || error.message
        );
    }
}

async function sendManagementCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Management Courses'
                    },
                    body: {
                        text: 'Select your preferred management course'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Course',
                        sections: [
                            {
                                title: 'Management Courses',
                                rows: [
                                    {
                                        id: 'bba',
                                        title: 'BBA'
                                    },
                                    {
                                        id: 'bcom',
                                        title: 'BCom'
                                    },
                                    {
                                        id: 'hotel',
                                        title: 'Hotel Management'
                                    },
                                    {
                                        id: 'aviation',
                                        title: 'Aviation'
                                    },
                                    {
                                        id: 'business',
                                        title: 'Business Management'
                                    },
                                    {
                                        id: 'management_other',
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

        console.log(
            'Management List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Management Error:',
            error.response?.data || error.message
        );
    }
}

async function sendArtsCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Arts & Science Courses'
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
                                title: 'Arts & Science',
                                rows: [
                                    {
                                        id: 'bca',
                                        title: 'BCA'
                                    },
                                    {
                                        id: 'bsc',
                                        title: 'BSc'
                                    },
                                    {
                                        id: 'ba',
                                        title: 'BA'
                                    },
                                    {
                                        id: 'bsw',
                                        title: 'BSW'
                                    },
                                    {
                                        id: 'psychology',
                                        title: 'Psychology'
                                    },
                                    {
                                        id: 'arts_other',
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

        console.log(
            'Arts List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Arts Error:',
            error.response?.data || error.message
        );
    }
}

async function sendCommerceCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Commerce Courses'
                    },
                    body: {
                        text: 'Select your preferred commerce course'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Course',
                        sections: [
                            {
                                title: 'Commerce Courses',
                                rows: [
                                    {
                                        id: 'bcom',
                                        title: 'BCom'
                                    },
                                    {
                                        id: 'bcom_finance',
                                        title: 'BCom Finance'
                                    },
                                    {
                                        id: 'bcom_ca',
                                        title: 'BCom CA'
                                    },
                                    {
                                        id: 'bcom_acca',
                                        title: 'BCom ACCA'
                                    },
                                    {
                                        id: 'ca',
                                        title: 'CA Foundation'
                                    },
                                    {
                                        id: 'cma',
                                        title: 'CMA'
                                    },
                                    {
                                        id: 'commerce_other',
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

        console.log(
            'Commerce List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Commerce Error:',
            error.response?.data || error.message
        );
    }
}

async function sendLawCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Law Courses'
                    },
                    body: {
                        text: 'Select your preferred law course'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Course',
                        sections: [
                            {
                                title: 'Law Courses',
                                rows: [
                                    {
                                        id: 'llb',
                                        title: 'LLB'
                                    },
                                    {
                                        id: 'ba_llb',
                                        title: 'BA LLB'
                                    },
                                    {
                                        id: 'bba_llb',
                                        title: 'BBA LLB'
                                    },
                                    {
                                        id: 'bcom_llb',
                                        title: 'BCom LLB'
                                    },
                                    {
                                        id: 'llm',
                                        title: 'LLM'
                                    },
                                    {
                                        id: 'law_other',
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

        console.log('Law List Sent:', response.data);

    } catch (error) {

        console.error(
            'Law Error:',
            error.response?.data || error.message
        );
    }
}

async function sendAviationCoursesList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Aviation Courses'
                    },
                    body: {
                        text: 'Select your preferred aviation course'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Course',
                        sections: [
                            {
                                title: 'Aviation Programs',
                                rows: [
                                    {
                                        id: 'bsc_aviation',
                                        title: 'BSc Aviation'
                                    },
                                    {
                                        id: 'airport_management',
                                        title: 'Airport Management'
                                    },
                                    {
                                        id: 'cabin_crew',
                                        title: 'Cabin Crew'
                                    },
                                    {
                                        id: 'pilot_training',
                                        title: 'Pilot Training'
                                    },
                                    {
                                        id: 'aircraft_maintenance',
                                        title: 'Aircraft Maintenance'
                                    },
                                    {
                                        id: 'ground_staff',
                                        title: 'Ground Staff'
                                    },
                                    {
                                        id: 'aviation_other',
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

        console.log(
            'Aviation List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Aviation Error:',
            error.response?.data || error.message
        );
    }
}

async function sendAdmissionChanceList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Admission Chances'
                    },
                    body: {
                        text: 'Want to know your admission chances? Select the option you would like us to analyze.'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Option',
                        sections: [
                            {
                                title: 'Analysis Options',
                                rows: [
                                    {
                                        id: 'plus_two_marks',
                                        title: 'Plus Two Marks'
                                    },
                                    {
                                        id: 'neet_score',
                                        title: 'NEET Score'
                                    },
                                    {
                                        id: 'keam_rank',
                                        title: 'KEAM Rank'
                                    },
                                    {
                                        id: 'lbs_rank',
                                        title: 'LBS Rank'
                                    },
                                    {
                                        id: 'other_exam',
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

    } catch (error) {

        console.error(
            'Admission Chance Error:',
            error.response?.data || error.message
        );
    }
}
async function sendCareerQualificationList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Career Counseling'
                    },
                    body: {
                        text: 'Tell us about your current qualification.'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select',
                        sections: [
                            {
                                title: 'Qualification',
                                rows: [
                                    {
                                        id: 'sslc',
                                        title: '10th Pass'
                                    },
                                    {
                                        id: 'plus_one',
                                        title: 'Plus One'
                                    },
                                    {
                                        id: 'plus_two',
                                        title: 'Plus Two'
                                    },
                                    {
                                        id: 'diploma',
                                        title: 'Diploma'
                                    },
                                    {
                                        id: 'degree',
                                        title: 'Degree'
                                    },
                                    {
                                        id: 'other_qualification',
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

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );
    }
}

async function sendInterestList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Career Interests'
                    },
                    body: {
                        text: '🌟 Which field interests you the most?'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Interest',
                        sections: [
                            {
                                title: 'Career Interests',
                                rows: [
                                    {
                                        id: 'medical_interest',
                                        title: 'Medical'
                                    },
                                    {
                                        id: 'engineering_interest',
                                        title: 'Engineering'
                                    },
                                    {
                                        id: 'commerce_interest',
                                        title: 'Commerce'
                                    },
                                    {
                                        id: 'management_interest',
                                        title: 'Management'
                                    },
                                    {
                                        id: 'law_interest',
                                        title: 'Law'
                                    },
                                    {
                                        id: 'aviation_interest',
                                        title: 'Aviation'
                                    },
                                    {
                                        id: 'arts_interest',
                                        title: 'Arts & Science'
                                    },
                                    {
                                        id: 'not_sure',
                                        title: 'Not Sure Yet'
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

        console.log(
            'Interest List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Interest Error:',
            error.response?.data || error.message
        );
    }
}

async function sendGuidanceList(to,businessNumber) {
    try {

        const response = await axios.post(
            'https://api.ycloud.com/v2/whatsapp/messages/sendDirectly',
            {
                from: businessNumber,
                to: to,
                type: 'interactive',
                interactive: {
                    type: 'list',
                    header: {
                        type: 'text',
                        text: 'Career Guidance'
                    },
                    body: {
                        text: '💡 What kind of guidance are you looking for?'
                    },
                    footer: {
                        text: 'Fortex Education'
                    },
                    action: {
                        button: 'Select Option',
                        sections: [
                            {
                                title: 'Guidance Options',
                                rows: [
                                    {
                                        id: 'course_selection',
                                        title: 'Course Selection'
                                    },
                                    {
                                        id: 'college_selection',
                                        title: 'College Selection'
                                    },
                                    {
                                        id: 'career_guidance',
                                        title: 'Career Guidance'
                                    },
                                    {
                                        id: 'not_sure_guidance',
                                        title: 'Not Sure Yet'
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

        console.log(
            'Guidance List Sent:',
            response.data
        );

    } catch (error) {

        console.error(
            'Guidance Error:',
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
    sendPercentageList,
    sendEngineeringCoursesList,
    sendManagementCoursesList,
    sendArtsCoursesList, 
    sendCommerceCoursesList,
    sendLawCoursesList,
    sendAviationCoursesList,
    sendAdmissionChanceList,
    sendCareerQualificationList,
    sendInterestList,
    sendGuidanceList
};