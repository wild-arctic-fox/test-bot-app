require('dotenv').config();
const rp = require('request-promise');


const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;


async function sendToUser(chat_id, text) {
  const options = {
    method: 'GET',
    uri: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    qs: {
      chat_id,
      text
    }
  };

  return rp(options);
}


module.exports.shortbot = async event => {
  const body = JSON.parse(event.body);
  const { chat, text } = body.message;
  console.log(body);
  if (text) {
    let message = '';
    try {
      message = `Bonjour, ${text}!`;
    } catch (error) {
      message = `Input: ${text}, \nError: ${error.message}`;
    }

    await sendToUser(chat.id, message);
  } else {
    await sendToUser(chat.id, 'Text message is expected.');
  }

  return { statusCode: 200 };
};