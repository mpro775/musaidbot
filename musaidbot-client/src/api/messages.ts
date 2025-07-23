import axios from "./axios"; // تأكد من مسار الاستيراد الصحيح
import type {
  ChannelType,
  ChatMessage,
  ConversationSession,
} from "../types/chat";

export async function fetchConversations(
  merchantId: string,
  channel?: ChannelType
): Promise<ConversationSession[]> {
  const { data } = await axios.get<{ data: ConversationSession[] }>(
    "/messages",
    {
      params: { merchantId, channel },
    }
  );
  return data.data;
}

export async function fetchSessionMessages(
  sessionId: string
): Promise<ChatMessage[]> {
  const { data } = await axios.get<ConversationSession>(
    `/messages/session/${sessionId}`
  );
  return data.messages;
}

export async function sendMessage(payload: {
  merchantId: string;
  sessionId: string;
  channel: ChannelType;
  messages: Array<{ role: "customer" | "bot"; text: string }>;
}) {
  return axios.post("/messages", payload);
}



export async function getSessionDetails(sessionId: string) {
  const { data } = await axios.get(`/messages/session/${sessionId}`);
  return data;
}
export async function setSessionHandover(sessionId: string, handover: boolean) {
  return axios.patch(`/messages/session/${sessionId}/handover`, { handoverToAgent: handover });
}
