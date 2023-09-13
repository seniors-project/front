import tw from 'twin.macro';
import { useState, useEffect } from 'react';

import ChatListBox from './chatListBox';
import ResumeWriteButton from '@/components/Button/ResumeWriteButton';
import { chatCreate } from '@/apis/chat';
import parseCookies from '@/utils/parseCookies';
import { useRouter } from 'next/router';

function ChatList() {
  interface ChatBox {
    roomId: number;
    roomName: string;
    message: string;
    chatMessageRes: {
      content: string;
      createdAt: string;
    };
  }
  const [chatBoxes, setChatBoxes] = useState<ChatBox[]>([]);
  const [activeChatBoxId, setActiveChatBoxId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies(document.cookie || '');
    const accessToken = cookies.accessToken;

    async function fetchChatData() {
      try {
        const response = await chatCreate(accessToken);
        setChatBoxes(response.data.data.chatRoomMembers);
      } catch (error) {
        console.error('Failed to fetch chat data', error);
      }
    }

    fetchChatData();
  }, []);

  const handleClick = (id: number | null) => {
    setActiveChatBoxId(prevId => (prevId === id ? null : id));

    if (id !== null) {
      router.push(`/chat/${id}`);
    }
  };

  return (
    <StyledChatListContainer>
      <StyledChatListBoxUpText>채팅 목록</StyledChatListBoxUpText>
      <StyledGrayLine />
      {chatBoxes.map(box => (
        <ChatListBox
          key={box.roomId}
          isActive={box.roomId === activeChatBoxId}
          onClick={() => handleClick(box.roomId)}
          name={box.roomName}
          message={box.chatMessageRes.content}
          date={box.chatMessageRes.createdAt}
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
}

export default ChatList;

const StyledChatListContainer = tw.div`
w-[396px] h-[820px] rounded-tl-[20px] bg-white flex flex-col border-t border-l border-gray-300
`;

const StyledGrayLine = tw.div`
w-full border-t border-gray-300
`;

const StyledChatListBoxUpText = tw.div`
w-full mb-4 my-[30px] ml-[24px]
`;

const StyledChatListBoxDownText = tw.div`
w-full text-center mb-4
`;
const StyledContent = tw.div`
flex-grow flex flex-col justify-center items-center
`;
