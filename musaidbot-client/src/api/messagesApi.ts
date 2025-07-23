import axios from 'axios';
import type { Message } from '../types/conversation';

const API_BASE = import.meta.env.VITE_API_URL || 'https://musaidbot-backend.onrender.com/api';

export const getMessagesByConversation = async (
  token: string,
  conversationId: string
): Promise<Message[]> => {
  const res = await axios.get<Message[]>(
    `${API_BASE}/messages/conversation/${conversationId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
