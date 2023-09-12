import tw from 'twin.macro';
import { useState, useEffect } from 'react';

import ChatListBox from './chatListBox';
import ResumeWriteButton from '@/components/Button/ResumeWriteButton';
import { chatCreate } from '@/apis/chat';
import parseCookies from '@/utils/parseCookies';

function ChatList() {
  interface ChatBox {
    id: number;
    name: string;
    message: string;
  }
  const [chatBoxes, setChatBoxes] = useState<ChatBox[]>([]);
  // 활성화된 채팅방의 ID를 저장하는 상태
  const [activeChatBoxId, setActiveChatBoxId] = useState<number | null>(null);
  // 가정: 각 채팅방에 대한 정보를 가진 배열
  // const chatBoxes = [
  //   { id: 1, name: '홍길동', message: '안녕하세요. 이력서 보고...' },
  //   { id: 2, name: '이순신', message: '안녕하세요. 이력서 보고...' },
  //   // ...
  // ];

  useEffect(() => {
    const cookies = parseCookies(document.cookie || '');
    const accessToken = cookies.accessToken;

    async function fetchChatData() {
      try {
        const response = await chatCreate(accessToken); // accessToken을 인자로 전달
        setChatBoxes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch chat data', error);
      }
    }

    fetchChatData();
  }, []);

  const handleClick = (id: number | null) => {
    setActiveChatBoxId(prevId => (prevId === id ? null : id));
  };

  return (
    <StyledChatListContainer>
      <StyledChatListBoxUpText>채팅 목록</StyledChatListBoxUpText>
      <StyledGrayLine />
      {/* {chatBoxes.map(box => (
        <ChatListBox
          key={box.id}
          isActive={box.id === activeChatBoxId}
          onClick={() => handleClick(box.id)}
          name={box.name}
          message={box.message}
        />
      ))} */}
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
