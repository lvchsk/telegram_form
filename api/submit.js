const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Метод не разрешён');
  }

  const { name, email, message } = req.body;

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const text = `Новая заявка с сайта:\n\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;

  try {
    await axios.post(TELEGRAM_API_URL, {
      chat_id: CHAT_ID,
      text: text,
    });

    res.status(200).send('Данные успешно отправлены в Telegram!');
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    res.status(500).send('Ошибка при отправке данных в Telegram');
  }
};
