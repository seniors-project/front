import { Client } from '@stomp/stompjs';

export interface ChatBox {
  profileImageUrl: string;
  roomId: number;
  roomName: string;
  message: string;
  chatMessageRes: {
    content: string;
    createdAt: string;
  };
}

export interface ChatListBoxProps {
  isActive: boolean;
  onClick: () => void;
  name: string;
  message: string;
  date: string;
  chatRoomId: number;
  profileImageUrl: string;
}

export interface ChatRoomBox {
  users: {
    userId: number;
  };
  chatMessageId: number;
  content: string;
  createdAt: string;
}

export interface ChatRoomBoxProps {
  userId: number | null;
  chatRoomId: string | string[];
  ws: Client | null;
}

export interface ChatButtonProps {
  token: string;
  chatUserId: number;
  twCustom?: string | undefined;
}
