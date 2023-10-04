import { Client } from '@stomp/stompjs';

export interface ChatBox {
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
  backgroundColor?: string;
  color?: string;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
}
