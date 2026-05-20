export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  avatar: string;
  unread?: number;
  ticked?: boolean;
}

export interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  currentUser: { name: string; role: string; avatar: string };
}

export interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  file?: { name: string; previewUrl?: string };
  dateDivider?: string;
}

export interface ChatWindowProps {
  contact: { name: string; avatar: string; online?: boolean };
  messages: Message[];
  myAvatar: string;
}
export const CONVERSATIONS: Conversation[] = [
  {
    id: "lisa",
    name: "Lisa Roy",
    preview: "Hi, are you Available Tomorrow?",
    time: "10:35 AM",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&fit=crop&crop=face",
  },
  {
    id: "jamie",
    name: "Jamie Taylor",
    preview: "Nice One. Will Do It tomorrow",
    time: "10:35 AM",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face",
  },
  {
    id: "jason",
    name: "Jason Roy",
    preview: "That's Great. I am Looking forward to having a great start.",
    time: "10:35 AM",
    ticked: true,
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80&fit=crop&crop=face",
  },
  {
    id: "amy",
    name: "Amy Frost",
    preview: "Hi, will you start working on the chat app right now?",
    time: "10:35 AM",
    ticked: true,
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&fit=crop&crop=face",
  },
  {
    id: "paul",
    name: "Paul Wilson",
    preview: "See you tomorrow champ",
    time: "10:35 AM",
    ticked: true,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face",
  },
  {
    id: "ana",
    name: "Ana Williams",
    preview: "??",
    time: "10:35 AM",
    unread: 1,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=face",
  },
];

export const MESSAGES_BY_CONVO: Record<string, Message[]> = {
  lisa: [
    {
      id: "1",
      sender: "them",
      text: "Hi David, have you got the project report pdf?",
    },
    {
      id: "2",
      sender: "me",
      text: "NO. I did not get it",
    },
    {
      id: "3",
      sender: "them",
      text: "Ok, I will just sent it here. Plz be sure to fill the details by today end of the day.",
      dateDivider: "Yesterday",
      file: { name: "project_report.pdf" },
    },
    {
      id: "4",
      sender: "me",
      text: "Ok. Should I send it over email as well after filling the details.",
    },
    {
      id: "5",
      sender: "them",
      text: "Ya. I'll be adding more team members to it.",
    },
    {
      id: "6",
      sender: "me",
      text: "OK",
    },
  ],
};
