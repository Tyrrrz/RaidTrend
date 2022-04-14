import fetch from 'node-fetch';
import { load as parseHTML } from 'cheerio';

// We are not using Telegram API because bots don't have access to
// message history and user accounts are annoying to automate.
// So instead we are scraping data from a widget.

interface Message {
  id: string;
  timestamp: Date;
  text: string;
}

const parseMessages = (html: string) => {
  const messages: Message[] = [];
  const $ = parseHTML(html);

  $('.tgme_widget_message').each((_, el) => {
    const id = $(el).attr('data-post')?.split('/').pop();
    if (!id) {
      throw new Error('Could not parse message id');
    }

    const timestampRaw = $(el).find('time[datetime]').attr('datetime');
    const timestamp = timestampRaw && new Date(timestampRaw);
    if (!timestamp) {
      throw new Error('Could not parse message timestamp');
    }

    const textRaw = $(el).find('.tgme_widget_message_text').html();
    const text = textRaw && parseHTML(textRaw.replace(/<br>/g, '\n')).text();
    if (!text) {
      throw new Error('Could not parse message text');
    }

    messages.push({
      id,
      timestamp,
      text
    });
  });

  return messages;
};

export const getMessages = async function* (channelName: string) {
  let offset = '1';

  while (true) {
    const url = `https://t.me/s/${channelName}?after=${offset}`;
    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch ${url}`);
    }

    const html = await response.text();

    const messages = parseMessages(html);
    if (messages.length <= 0) {
      break;
    }

    for (const message of messages) {
      yield message;
      offset = message.id;
    }
  }
};
