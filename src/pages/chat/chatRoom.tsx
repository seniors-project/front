import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { chatEnter } from '@/apis/chat';
import parseCookies from '@/utils/parseCookies';
import tw from 'twin.macro';
import { useRecoilValue } from 'recoil';
import { loggedInUserIdState } from '@/atom/chatUser';
import ChatInputBox from './chatInputBox';
import { Client } from '@stomp/stompjs';
import { ChatRoomBox } from '@/types/chat';

function ChatRoom() {
  const [chatRoomBoxes, setChatRoomBoxes] = useState<ChatRoomBox[]>([]);
  const userId = useRecoilValue(loggedInUserIdState);
  const router = useRouter();
  const { id } = router.query;
  const [ws, setWs] = useState<Client | null>(null);

  useEffect(() => {
    if (id) {
      const cookies = parseCookies(document.cookie || '');
      const accessToken = cookies.accessToken;
      const roomId = Number(id);

      const fetchChatData = async () => {
        try {
          const response = await chatEnter(accessToken, roomId);
          setChatRoomBoxes(response.data.data.chatMessages);

          initializeWebSocket();
        } catch (error) {
          console.error('Failed to fetch chat data', error);
        }
      };

      const initializeWebSocket = () => {
        console.log('Initializing WebSocket...'); // WebSocket 초기화 시작 로그 추가

        const client = new Client({
          brokerURL: 'wss://strangehoon.shop/api',
          connectHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
          debug: function (str) {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        client.onConnect = function (frame) {
          console.log('Connected: ' + frame); // 연결 성공 로그 추가
          console.log(`Subscribing to /sub/chat/room/${id}`); // 구독 시작 로그 추가
          client.subscribe(`/sub/chat/room/${id}`, function (message) {
            console.log('Received message: ', message); // 수신된 메시지 로그 추가
            setChatRoomBoxes(prev => [...prev, JSON.parse(message.body)]);
          });
        };

        client.onStompError = function (frame) {
          console.log('Broker reported error: ' + frame.headers['message']);
          console.log('Additional details: ' + frame.body);
        };
        client.onWebSocketError = function (error) {
          console.error('WebSocket Error', error);
        };
        console.log('Activating client...');

        client.activate();

        console.log('Client activated...'); // 클라이언트 활성화 로그 추가
        setWs(client);
      };

      fetchChatData();
    }

    return () => {
      if (ws) {
        ws.deactivate();
      }
    };
  }, [id]);

  return (
    <StyledChatRoomBox style={{ backgroundColor: id ? '#dfe2e6' : '#F1F3F5' }}>
      {id ? (
        <>
          <StyledMessagesContainer>
            <StyledChatRoomDate>23년 12월 23일 (목)</StyledChatRoomDate>
            {chatRoomBoxes.map(item => (
              <div key={item.chatMessageId}>
                {item.users?.userId === userId ? (
                  <StyledSendMessage>{item.content}</StyledSendMessage>
                ) : (
                  <StyleReceiveMessage>{item.content}</StyleReceiveMessage>
                )}
              </div>
            ))}
          </StyledMessagesContainer>
          <ChatInputBox userId={userId} chatRoomId={id} ws={ws} />
        </>
      ) : null}
    </StyledChatRoomBox>
  );
}

export default ChatRoom;

const StyledChatRoomBox = tw.div`
  w-[803px]
  h-[821px]
  rounded-tr-[20px]
  flex flex-col justify-between p-6
  border-t border-r border-solid border-gray-300
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
