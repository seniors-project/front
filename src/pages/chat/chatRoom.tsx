import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { chatEnter } from '@/apis/chat';
import parseCookies from '@/utils/parseCookies';
import tw from 'twin.macro';
import { useRecoilValue } from 'recoil';
import { loggedInUserIdState } from '@/atom/chatUser';
import ChatInputBox from './chatInputBox';

function ChatRoom() {
  interface ChatRoomBox {
    id: number;
    roomName: string;
    message: string;
    chatMessageRes: {
      content: string;
      createdAt: string;
    };
  }
  const [chatRoomBoxes, setChatRoomBoxes] = useState<ChatRoomBox[]>([]);
  const userId = useRecoilValue(loggedInUserIdState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const cookies = parseCookies(document.cookie || '');
    const accessToken = cookies.accessToken;

    async function fetchChatData() {
      try {
        const response = await chatEnter(accessToken, id);
        setChatRoomBoxes(response.data.data.chatMessages);
      } catch (error) {
        console.error('Failed to fetch chat data', error);
      }
    }

    fetchChatData();
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket('ws://strangehoon.shop/api');

    ws.onopen = () => {
      console.log('connected to the websocket server');
    };

    ws.onmessage = message => {
      const data = JSON.parse(message.data);
      setChatRoomBoxes(prev => [...prev, data]);
    };

    ws.onclose = () => {
      console.log('disconnected from the websocket server');
    };

    return () => {
      ws.close();
    };
  }, [id]);

  return (
    <StyledChatRoomBox>
      <StyledMessagesContainer>
        <StyledChatRoomDate>23년 12월 23일 (목)</StyledChatRoomDate>
        {chatRoomBoxes.map(item => (
          <>
            {item.users.userId === userId ? (
              <StyledSendMessage key={item.chatMessageId}>
                {item.content}
              </StyledSendMessage>
            ) : (
              <StyleReceiveMessage key={item.chatMessageId}>
                {item.content}
              </StyleReceiveMessage>
            )}
          </>
        ))}
      </StyledMessagesContainer>
      <ChatInputBox userId={userId} chatRoomId={id} />
    </StyledChatRoomBox>
  );
}

export default ChatRoom;

const StyledChatRoomBox = tw.div`
  w-[803px]
  h-[821px]
  rounded-tr-[20px]
  bg-[#dfe2e6]
  flex flex-col justify-between p-6
`;

const StyledMessagesContainer = tw.div`
  flex flex-col items-start justify-start
  w-full
  overflow-y-auto
`;

const StyledChatRoomDate = tw.div`
w-[211px] h-[44px] rounded-[100px] bg-gray-200 text-gray-300 flex justify-center items-center self-center
`;

const StyleReceiveMessage = tw.div`
  max-w-[60%]
  bg-white
  text-black
  px-4 py-2
  my-6
  rounded-lg
`;

const StyledSendMessage = tw.div`
  max-w-[60%]
  bg-[#E5F1FF]
  text-black
  px-4 py-2
  my-6
  rounded-lg
  self-end
  text-right
`;
