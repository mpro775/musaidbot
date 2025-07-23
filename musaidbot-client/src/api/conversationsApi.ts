import axios from 'axios';
import type { Conversation } from '../types/conversation';

const API_BASE = import.meta.env.VITE_API_URL || 'https://musaidbot-backend.onrender.com/api';

export const getConversationsByMerchant = async (
  token: string,
  merchantId: string
): Promise<Conversation[]> => {
  const res = await axios.get<Conversation[]>(
    `${API_BASE}/conversations/merchant/${merchantId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
