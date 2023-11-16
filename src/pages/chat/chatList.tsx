import tw from 'twin.macro';
import { useState, useEffect } from 'react';

import ChatListBox from './chatListBox';
import ResumeWriteButton from '@/components/Button/ResumeWriteButton';
import { getChatList } from '@/apis/chat';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loggedInUserIdState } from '@/atom/chatUser';
import { ChatBox } from '@/types/chat';
import { Client } from '@stomp/stompjs';

import { useQuery } from '@tanstack/react-query';

const StyledChatListContainer = tw.div`
  w-[396px] rounded-tl-[20px] bg-white flex flex-col border-t border-l border-gray-300
`;

const StyledGrayLine = tw.div`
  w-full border-t border-gray-300
`;

const StyledChatListBoxUpText = tw.div`
  w-full mb-4 my-[30px] ml-[24px] text-[26px] font-semibold
`;

const StyledChatListBoxDownText = tw.div`
  w-full text-center mb-4
`;
const StyledContent = tw.div`
  flex-grow flex flex-col justify-center items-center
`;

const ChatList = () => {
  const [chatBoxes, setChatBoxes] = useState<ChatBox[]>([]);
  const [activeChatBoxId, setActiveChatBoxId] = useState<number | null>(null);
  const [, setUserId] = useRecoilState(loggedInUserIdState);
  const [ws, setWs] = useState<Client | null>(null);
  const router = useRouter();
  const currentRoomId = router.query.id ? Number(router.query.id) : null;
  const [userNotification, setUserNotification] = useState<number[]>([]);

  const { data } = useQuery(
    ['chatList'],
    () => {
      return getChatList();
    },
    {
      onSuccess: data => console.log(data),
      onError: error => console.error('Failed to fetch chat data', error),
    },
  );

  useEffect(() => {
    const initializeWebSocket = () => {
      console.log('Initializing WebSocket...');

      const client = new Client({
        brokerURL: 'wss://strangehoon.shop/api/notification',
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = function (frame) {
        console.log('Connected1: ' + frame);
        console.log('WebSocket connection established');
        client.subscribe('/sub/notification', function (message) {
          console.log('Received message1: ', message);
          setUserNotification(prev => [...prev, JSON.parse(message.body)]);
          console.log(`chat2:`, userNotification);
        });
      };

      client.onStompError = function (frame) {
        console.log('Additional details1: ' + frame.body);
        console.log('WebSocket Stomp error occurred');
      };

      client.onWebSocketError = function (error) {
        console.error('WebSocket Error1', error);
        console.log('WebSocket error occurred');
      };

      console.log('Activating client...');
      client.activate();
      console.log('Client activated1...');
      setWs(client);
    };

    initializeWebSocket();

    return () => {
      if (ws) {
        ws.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (data) {
      setChatBoxes(data.data.data.chatRoomMembers);
      setUserId(data.data.data.userId);
    }
  }, [data, setUserId]);

  const handleClick = (id: number | null) => {
    if (activeChatBoxId === id) {
      router.push('/chat');
      setActiveChatBoxId(null);
    } else {
      setActiveChatBoxId(id);
      if (id !== null) {
        router.push(`/chat/${id}`);
      }
    }
  };

  return (
    <StyledChatListContainer>
      <StyledChatListBoxUpText>채팅 목록</StyledChatListBoxUpText>
      <StyledGrayLine />
      {chatBoxes?.map(box => (
        <ChatListBox
          key={box.roomId}
          isActive={box.roomId === currentRoomId}
          onClick={() => handleClick(box.roomId)}
          name={box.roomName}
          message={box.chatMessageRes.content}
          date={box.chatMessageRes.createdAt}
          chatRoomId={box.roomId}
          profileImageUrl={box.profileImageUrl}
          notification={userNotification.includes(box.userId)} // 여기를 수정
        />
      ))}
      {chatBoxes.length === 0 && (
        <StyledContent>
          <StyledChatListBoxDownText>
            공개 이력서에서
            <br />
            인맥을 쌓고 채팅을 해 보세요!
          </StyledChatListBoxDownText>
          <ResumeWriteButton />
        </StyledContent>
      )}
    </StyledChatListContainer>
  );
};

export default ChatList;
