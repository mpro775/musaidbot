// types/chat.ts

export type ChannelType = 'whatsapp' | 'telegram' | 'webchat';

export interface ChatMessage {
  role: 'customer' | 'bot' | 'agent'; // إضافة agent لدعم الردود من الموظف
  text: string;
  timestamp: string; // ISO date string
  metadata?: Record<string, unknown>;
}

export interface ConversationSession {
  _id: string;
  merchantId: string;
  sessionId: string;
  channel: ChannelType;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
