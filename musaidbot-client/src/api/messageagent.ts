import axios from "axios";
import type { ChannelType } from "../types/chat";

export async function sendAgentMessage(payload: {
  merchantId: string;
  sessionId: string;
  channel: ChannelType;
  messages: Array<{ role: "agent"; text: string }>;
}) {
  // استبدل الـ URL إلى Webhook الخاص بك في n8n
  return axios.post(
    `https://n8n.smartagency-ye.com/webhook/980fd04a-4257-41cf-8cd0-e471a45a9f6c/webhooks/incoming/${payload.merchantId}`,
    {
      from: payload.sessionId,
      text: payload.messages[0].text,
      channel: payload.channel,
      messages: payload.messages, // هذا مهم حتى يتحقق شرط الـ IF في n8n
    }
  );
}
