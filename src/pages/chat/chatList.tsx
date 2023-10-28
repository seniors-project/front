import styled from '@emotion/styled';
import tw from 'twin.macro';
import { useState, useEffect } from 'react';

import ChatListBox from './chatListBox';
import ResumeWriteButton from '@/components/Button/ResumeWriteButton';
import { getChatList } from '@/apis/chat';
import parseCookies from '@/utils/parseCookies';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { loggedInUserIdState } from '@/atom/chatUser';
import { ChatBox } from '@/types/chat';

import { pretenderedSemiBold } from '@/styles/fonts';
import { useQuery } from '@tanstack/react-query';

const ChatList = () => {
  const [chatBoxes, setChatBoxes] = useState<ChatBox[]>([]);
  const [activeChatBoxId, setActiveChatBoxId] = useState<number | null>(null);
  const [, setUserId] = useRecoilState(loggedInUserIdState);
  const router = useRouter();
  const currentRoomId = router.query.id ? Number(router.query.id) : null;

  const { data } = useQuery(
    ['chatList'],
    () => {
      const cookies = parseCookies(document.cookie || '');
      const accessToken = cookies.accessToken;
      return getChatList(accessToken);
    },
    {
      onSuccess: data => console.log(data),
      onError: error => console.error('Failed to fetch chat data', error),
    },
  );

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

const StyledChatListContainer = tw.div`
w-[396px] rounded-tl-[20px] bg-white flex flex-col border-t border-l border-gray-300
`;

const StyledGrayLine = tw.div`
w-full border-t border-gray-300
`;

const StyledChatListBoxUpText = styled.div`
  ${tw`w-full mb-4 my-[30px] ml-[24px] text-[26px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledChatListBoxDownText = tw.div`
w-full text-center mb-4
`;
const StyledContent = tw.div`
flex-grow flex flex-col justify-center items-center
`;
