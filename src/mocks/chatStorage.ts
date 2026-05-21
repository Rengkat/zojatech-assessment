import type { Conversation, Message } from "./messagesMocks";
import { CONVERSATIONS, MESSAGES_BY_CONVO } from "./messagesMocks";

const CONVOS_KEY = "chat_conversations";
const MESSAGES_KEY = "chat_messages";

function seed() {
  if (!localStorage.getItem(CONVOS_KEY)) {
    localStorage.setItem(CONVOS_KEY, JSON.stringify(CONVERSATIONS));
  }
  if (!localStorage.getItem(MESSAGES_KEY)) {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(MESSAGES_BY_CONVO));
  }
}

seed();

export function getConversations(): Conversation[] {
  try {
    return JSON.parse(localStorage.getItem(CONVOS_KEY) ?? "[]");
  } catch {
    return CONVERSATIONS;
  }
}

function saveConversations(convos: Conversation[]) {
  localStorage.setItem(CONVOS_KEY, JSON.stringify(convos));
}

/** Update the preview text + time shown in the conversation list */
export function updateConversationPreview(id: string, preview: string) {
  const convos = getConversations();
  const idx = convos.findIndex((c) => c.id === id);
  if (idx !== -1) {
    convos[idx].preview = preview;
    convos[idx].time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    convos[idx].unread = 0; // clear unread when we're actively chatting
  }
  saveConversations(convos);
}

export function getMessages(convoId: string): Message[] {
  try {
    const all: Record<string, Message[]> = JSON.parse(localStorage.getItem(MESSAGES_KEY) ?? "{}");
    return all[convoId] ?? [];
  } catch {
    return MESSAGES_BY_CONVO[convoId] ?? [];
  }
}

export function sendMessage(convoId: string, text: string, file?: { name: string }): Message {
  const all: Record<string, Message[]> = JSON.parse(localStorage.getItem(MESSAGES_KEY) ?? "{}");

  const newMsg: Message = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    sender: "me",
    text,
    ...(file ? { file } : {}),
  };

  all[convoId] = [...(all[convoId] ?? []), newMsg];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(all));

  // Keep conversation list preview in sync
  updateConversationPreview(convoId, text || `📎 ${file?.name}`);

  return newMsg;
}

/** Clear all chat data and re-seed from mocks (useful for dev reset) */
export function resetChatStorage() {
  localStorage.removeItem(CONVOS_KEY);
  localStorage.removeItem(MESSAGES_KEY);
  seed();
}
