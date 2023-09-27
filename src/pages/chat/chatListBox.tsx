import tw from 'twin.macro';
import styled from '@emotion/styled';
import { ChatListBoxProps } from '@/types/chat';
import { dateconversion } from '@/utils/dateconversion';

function ChatListBox({
  isActive,
  onClick,
  name,
  message,
  date,
}: ChatListBoxProps) {
  const lastDate = dateconversion(date);

  return (
    // <ChatListBoxWrapper isActive={isActive} onClick={onClick}>
    //   <StyledProfileImg src="/images/profile.png" alt="Profile" />
    //   <StyledChatContent>
    //     <StyledProfileName>{name}</StyledProfileName>
    //     <StyledChatPreview>{message}</StyledChatPreview>
    //   </StyledChatContent>
    //   <StyledChatPreviewDate>{lastDate}</StyledChatPreviewDate>
    // </ChatListBoxWrapper>
    <ChatListBoxcontainer>
      <ChatListBoxWrapper>
        <StyledProfileImgWrapper>
          <StyledProfileImg>1111111111111</StyledProfileImg>
        </StyledProfileImgWrapper>
        <StyledChatListBoxContentWrapper>
          <StyledChatListBoxContent>
            <StyledProfileName>d</StyledProfileName>
            <StyledChatPreview>d</StyledChatPreview>
          </StyledChatListBoxContent>
          <StyledChatListDate>33333333</StyledChatListDate>
        </StyledChatListBoxContentWrapper>
      </ChatListBoxWrapper>
    </ChatListBoxcontainer>
  );
}

export default ChatListBox;

// const ChatListBoxWrapper = styled.div<{ isActive: boolean }>`
//   ${tw`flex w-[396px] h-[109px] px-[15px] py-6 border-b border-gray-300`}
//   ${({ isActive }) => (isActive ? tw`bg-[#E5F1FF]` : '')};
// `;

// const StyledProfileImg = tw.img`
//   w-[60px] h-[60px] rounded-full mr-4
// `;

// const StyledChatContent = tw.div`
//   flex flex-col flex-grow
// `;

// const StyledProfileName = tw.div`
//   font-bold text-lg mb-2
// `;

// const StyledChatPreview = tw.div`
//   text-sm text-gray-600
// `;

// const StyledChatPreviewDate = tw.div`
//   self-start ml-4 text-sm text-gray-400
// `;

const ChatListBoxcontainer = tw.div`
border-black border-2	
px-[15px] py-[24px]
`;

const ChatListBoxWrapper = tw.div`
border-black border-2 flex gap-[12px] overflow-hidden
`;
const StyledProfileImgWrapper = tw.div`
border-black border-2	
`;
const StyledProfileImg = tw.div`
border-black border-2	rounded-full
`;
const StyledChatListBoxContentWrapper = tw.div`
border-black border-2 flex gap-[4px]
`;
const StyledChatListBoxContent = tw.div`
border-black border-2
`;

const StyledChatListDate = tw.div`
border-black border-2
`;
const StyledProfileName = tw.div`
border-black border-2
`;
const StyledChatPreview = tw.div`
border-black border-2
`;
