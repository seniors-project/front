import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { chatEnter } from '@/apis/chat';
import parseCookies from '@/utils/parseCookies';
import tw from 'twin.macro';

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
  }, []);

  return (
    <StyledChatRoomBox>
      <StyledMessagesContainer>
        <StyledChatRoomDate>23년 12월 23일 (목)</StyledChatRoomDate>
        {chatRoomBoxes.map(item => (
          <>
            <StyledSendMessage>{item.content}</StyledSendMessage>
            <StyleReceiveMessage>수신메세지</StyleReceiveMessage>
          </>
        ))}
        {/* {chatRoomBoxes.map(item => (
          <div key={item.chatMessageId}>
            {item.users.userId === loggedInUserId ? (
              <StyledSendMessage>{item.content}</StyledSendMessage>
            ) : (
              <StyleReceiveMessage>{item.content}</StyleReceiveMessage>
            )}
          </div>
        ))} */}
      </StyledMessagesContainer>
      <StyledChatInputContainer>
        <StyledChatRoomInputBox
          rows={1}
          placeholder="메세지를 입력해 주세요."
        />
        <StyleChatSendButton>전송</StyleChatSendButton>
      </StyledChatInputContainer>
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

const StyledChatInputContainer = tw.div`
  w-full
  h-[134px]
  rounded-[4px]
  bg-white
  relative
`;

const StyledChatRoomInputBox = tw.textarea`
  w-full h-full rounded-[4px]
  pr-[100px] pl-4 py-3
  resize-none
  overflow-y-auto
`;

const StyleChatSendButton = tw.button`
  w-[80px]
  h-[45px]
  rounded-[4px]
  absolute bottom-4 right-4
  bg-[#0177FD]
  text-white
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
