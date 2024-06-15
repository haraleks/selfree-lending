const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6320192532:AAEHr66c3xDFGvSr_jFeEn5_OEJT8jCktDg');
const axios = require('axios');
const nodemailer = require('nodemailer');

async function createLeadInCrm(name, phone, note) {

    const apiUrl = 'https://selfree.s20.online/api/1/lead/create?token=c4ca4238a0b923820dcc509a6f75849b';

    const data = {
        name,
        phone,
        promo: '',
        email: '',
        skype: '',
        source: 'selfree-global',
        note,
    };

    try {
        const response = await axios.post(apiUrl, data);
        return response;
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}

async function sendToMail(text) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'selfree-global161@yandex.ru',
            pass: 'tvhrluoidmmcjlps',
        },
    });

    let result = await transporter.sendMail({
        from: 'selfree-global161@yandex.ru',
        to: 'e-17344620@yandex.ru',
        subject: 'Заявки',
        html: text,
    });

    return result;
}


function send(formData) {
    if (typeof formData !== 'object') return {
        status: 'error',
        message: 'ERROR_TYPE_DATA'
    }

    if (!formData?.client_phone) return {
        status: 'error',
        message: 'EMPTY_DATA'
    }

    let name = formData?.client_name ? formData.client_name : '';
    let phone = formData.client_phone;
    let promo = formData?.client_promo ? formData.client_promo : '';
    let lang = formData?.client_lang ? formData.client_lang : '';
    let goals = Array.isArray(formData.client_goal) && formData.client_goal ? formData.client_goal : [];
    let level = formData?.client_level ? formData.client_level : '';
    let comment = formData?.client_text ? formData.client_text : 'Клиента заинтересовал видеокурс от Сурена';
    let utm_url = formData?.utm_url ? formData?.utm_url : '';
    let utm_objects = formData?.utm_objects ? formData.utm_objects : '';

    let messageTgBot = ``;
    let messageAlfaCrm = ``;
    let messageMail = ``;

    messageTgBot += `<b>Имя:</b> ${name}\n`;
    messageTgBot += `<b>Телефон:</b> ${phone}\n`;
    

    messageMail += `<b>Имя:</b> ${name}<br/>`;
    messageMail += `<b>Телефон:<b> ${phone}<br/>`;
   


    if (promo) {
        messageAlfaCrm += `Промокод: ${promo}`;
        messageTgBot += `<b>Промокод:</b> ${promo}\n`;
        messageMail += `<b>Промокод:<b> ${promo}<br/>`;
    }


    if (lang) {

        switch (lang) {
            case 'en': lang = `Английский`; break;
            case 'fr': lang = `Французский`; break;
            case 'sp': lang = `Испанский`; break;
            case 'ru': lang = `Русский`; break;
            default: lang = 'Не выбрано'; break;
        }
        messageAlfaCrm += `Язык: ${lang}`;
        messageTgBot += `<b>Язык:</b> ${lang}\n`;
        messageMail += `<b>Язык:</b> ${lang}<br/>`;
    }

    if (level) {
        messageAlfaCrm += `Уровень: ${level}\n`;
        messageTgBot += `<b>Уровень:</b> ${level}\n`;
        messageMail += `<b>Уровень:</b> ${level}<br/>`;
    }

    if (goals.length != 0) {
        messageTgBot += `<b>Цели:</b>\n`;
        messageMail += `<b>Цели:</b><br/>`;
        for (let i = 0; i < goals.length; i++) {
            messageTgBot += `   ${i + 1}. ${goals[i]}\n`;
            messageMail += `   ${i + 1}. ${goals[i]}<br/>`;
        }
    }

    if (comment) {
        messageAlfaCrm += `Комментарий: ${comment}`;
        messageTgBot += `<b>Комментарий:</b> ${comment}\n`;
        messageMail += `<b>Комментарий:</b> ${comment}<br/>`;
    }

    messageTgBot += `<b>URL:</b> ${utm_url}\n`;

    for (const key in utm_objects) {
        if (Object.hasOwnProperty.call(utm_objects, key)) {
            const element = utm_objects[key];
            messageTgBot += `<b>${key}</b>: ${element}\n`;
        }
    }

    messageTgBot += `<b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}\n`;

    messageMail += `<b>URL:</b> ${utm_url}<br/>`;

    for (const key in utm_objects) {
        if (Object.hasOwnProperty.call(utm_objects, key)) {
            const element = utm_objects[key];
            messageMail += `<b>${key}</b>: ${element}<br/>`;
        }
    }


    messageMail += `<b>Время:</b> ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}\n`;

    try {

        createLeadInCrm(name, phone, messageAlfaCrm);
        sendToMail(messageMail);

        bot.sendMessage('-1001875955991', messageTgBot, {
            parse_mode: 'HTML'
        });

        return {
            status: 'success',
            message: 'SENT'
        }

    } catch (e) {
        console.log(e);
        return {
            status: 'error',
            message: 'SERVER_THROW_ERROR'
        }
    }

}

module.exports = send;