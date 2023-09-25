import tw from 'twin.macro';
import styled from '@emotion/styled';
import { ChatListBoxProps } from '@/types/chat';

function ChatListBox({
  isActive,
  onClick,
  name,
  message,
  date,
}: ChatListBoxProps) {
  return (
    <ChatListBoxWrapper isActive={isActive} onClick={onClick}>
      <StyledProfileImg src="/images/profile.png" alt="Profile" />
      <StyledChatContent>
        <StyledProfileName>{name}</StyledProfileName>
        <StyledChatPreview>{message}</StyledChatPreview>
      </StyledChatContent>
      <StyledChatPreviewDate>{date}</StyledChatPreviewDate>
    </ChatListBoxWrapper>
  );
}

export default ChatListBox;

const ChatListBoxWrapper = styled.div<{ isActive: boolean }>`
  ${tw`flex w-[396px] h-[109px] px-[15px] py-6 border-b border-gray-300`}
  ${({ isActive }) => (isActive ? tw`bg-[#E5F1FF]` : '')};
`;

const StyledProfileImg = tw.img`
  w-[60px] h-[60px] rounded-full mr-4
`;

const StyledChatContent = tw.div`
  flex flex-col flex-grow
`;

const StyledProfileName = tw.div`
  font-bold text-lg mb-2
`;

const StyledChatPreview = tw.div`
  text-sm text-gray-600
`;

const StyledChatPreviewDate = tw.div`
  self-start ml-4 text-sm text-gray-400
`;
