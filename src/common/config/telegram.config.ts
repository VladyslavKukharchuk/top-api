import { ITelegramOptions } from '@api/telegram/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
  const token = process.env.TELEGRAM_TOKEN;
  if (!token) {
    throw new Error('TELEGRAM_TOKEN not found');
  }
  const chatId = process.env.CHAT_ID ?? '';
  return {
    token,
    chatId,
  };
};
