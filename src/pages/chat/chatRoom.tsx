import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { chatEnter } from '@/apis/chat';
import tw from 'twin.macro';
import { useRecoilValue } from 'recoil';
import { loggedInUserIdState } from '@/atom/chatUser';
import ChatInputBox from './chatInputBox';
import { Client } from '@stomp/stompjs';
import { ChatRoomBox } from '@/types/chat';
import { dateconversion } from '@/utils/dateconversion';

const StyledChatRoomBox = tw.div`
  w-[803px]
  h-[769px]
  flex flex-col justify-between p-6
  border-t border-r border-solid border-gray-300
  sm:(rounded-none)
  lg:(rounded-tr-[20px])
  `;

const StyledMessagesContainer = tw.div`
  flex flex-col
  overflow-y-auto
`;

const StyledChatRoomDate = tw.div`
  w-[211px] h-[44px] rounded-[100px] bg-gray-200 text-gray-300 flex justify-center items-center
`;

const StyleReceiveMessage = tw.div`
  bg-white
  text-black
  px-4 py-2
  my-6
  rounded-lg
`;

const StyledSendMessage = tw.div`
  bg-[#E5F1FF]
  text-black
  px-4 py-2
  my-6 
  mr-4
  rounded-lg
`;

const StyledSendMessageWrapper = tw.div`
  flex justify-end
`;

const StyleReceiveMessageWrapper = tw.div`
  flex justify-start
`;

const StyleChatRoomDateWrapper = tw.div`
  flex justify-center items-center self-center`;

function ChatRoom() {
  const [chatRoomBoxes, setChatRoomBoxes] = useState<ChatRoomBox[]>([]);
  const userId = useRecoilValue(loggedInUserIdState);
  const router = useRouter();
  const { id } = router.query;
  const [ws, setWs] = useState<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (id) {
      const roomId = Number(id);

      const fetchChatData = async () => {
        try {
          const response = await chatEnter(roomId);
          setChatRoomBoxes(response.data.data.chatMessages);
          console.log(`chat1: ${JSON.stringify(chatRoomBoxes)}`);
        } catch (error) {
          console.error('Failed to fetch chat data', error);
        }
      };

      fetchChatData();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const initializeWebSocket = () => {
        console.log('Initializing WebSocket...');

        const client = new Client({
          brokerURL: 'wss://strangehoon.shop/api/chat',
          debug: function (str) {
            console.log(str);
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
        });

        client.onConnect = function (frame) {
          console.log('Connected: ' + frame);
          console.log(`Subscribing to /sub/chat/room/${id}`);
          client.subscribe(`/sub/chat/room/${id}`, function (message) {
            console.log('Received message: ', message);
            setChatRoomBoxes(prev => [...prev, JSON.parse(message.body)]);
            console.log(`chat2:`, chatRoomBoxes);
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
        console.log('Client activated...');
        setWs(client);
      };

      initializeWebSocket();

      return () => {
        if (ws) {
          ws.deactivate();
        }
      };
    }
  }, [id]);

  useEffect(() => {
    console.log('chatRoomBoxes updated:', chatRoomBoxes);
  }, [chatRoomBoxes]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [chatRoomBoxes]);

  let lastDate: string | null = null;

  return (
    <StyledChatRoomBox style={{ backgroundColor: id ? '#dfe2e6' : '#F1F3F5' }}>
      {id ? (
        <>
          <StyledMessagesContainer ref={messagesEndRef}>
            {chatRoomBoxes.map(item => {
              const currentDate = dateconversion(item.createdAt);

              const showDateSeparator = !lastDate || currentDate !== lastDate;
              lastDate = currentDate;

              return (
                <div key={item.chatMessageId}>
                  {showDateSeparator && (
                    <StyleChatRoomDateWrapper>
                      <StyledChatRoomDate>{currentDate}</StyledChatRoomDate>
                    </StyleChatRoomDateWrapper>
                  )}

                  {item.users?.userId === userId ? (
                    <StyledSendMessageWrapper>
                      <StyledSendMessage>{item.content}</StyledSendMessage>
                    </StyledSendMessageWrapper>
                  ) : (
                    <StyleReceiveMessageWrapper>
                      <StyleReceiveMessage>{item.content}</StyleReceiveMessage>
                    </StyleReceiveMessageWrapper>
                  )}
                </div>
              );
            })}
          </StyledMessagesContainer>
          <ChatInputBox userId={userId} chatRoomId={id} ws={ws} />
        </>
      ) : null}
    </StyledChatRoomBox>
  );
}

export default ChatRoom;
