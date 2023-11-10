import tw from 'twin.macro';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatListBoxProps } from '@/types/chat';
import { dateconversion } from '@/utils/dateconversion';
import { useRouter } from 'next/router';
import { setDeleteChatRoom } from '@/apis/chat';

const ChatListBox = ({
  isActive,
  onClick,
  name,
  message,
  date,
  chatRoomId,
  profileImageUrl,
}: ChatListBoxProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const lastDate = dateconversion(date);
  const queryClient = useQueryClient();
  const router = useRouter();

  const leaveChatMutation = useMutation(
    () => {
      return setDeleteChatRoom(chatRoomId);
    },
    {
      onSuccess: () => {
        console.log('성공적으로 채팅방을 나갔습니다.');
        queryClient.invalidateQueries(['chatList']);
        router.push('/chat');
      },
      onError: error => {
        console.error('채팅방 나가기에 실패했습니다:', error);
      },
    },
  );

  const handleLeaveChat = () => {
    leaveChatMutation.mutate();
  };

  return (
    <ChatListBoxWrapper
      isActive={isActive}
      onClick={onClick}
      className="group"
      onMouseEnter={() => setShowDropdown(false)} // Hide dropdown but show the MoreOptionsButton on hover
      onMouseLeave={() => {
        setShowDropdown(false); // Hide the dropdown when mouse leaves
      }}>
      <ProfileImageContainer>
        <StyledProfileImg src={profileImageUrl} alt="Profile" />
        <OnlineStatusIndicator />
      </ProfileImageContainer>
      <StyledChatContent>
        <StyledProfileName>{name}</StyledProfileName>
        <StyledChatPreview>{message}</StyledChatPreview>
      </StyledChatContent>
      <StyledChatPreviewDate>{lastDate}</StyledChatPreviewDate>
      <MoreOptionsButton
        onClick={e => {
          e.stopPropagation(); // Prevents the outer onClick from being triggered
          setShowDropdown(!showDropdown);
        }}>
        ...
      </MoreOptionsButton>
      {showDropdown && (
        <OptionsDropdown>
          <OptionItem onClick={handleLeaveChat}>채팅방 나가기</OptionItem>
        </OptionsDropdown>
      )}
    </ChatListBoxWrapper>

    // <ChatListBoxcontainer
    //   isActive={isActive}
    //   onClick={onClick}
    //   className="group"
    //   onMouseEnter={() => setShowDropdown(false)} // Hide dropdown but show the MoreOptionsButton on hover
    //   onMouseLeave={() => {
    //     setShowDropdown(false); // Hide the dropdown when mouse leaves
    //   }}>
    //   <ChatListBoxWrapper>
    //     <StyledProfileImgWrapper>
    //       <StyledProfileImg src={profileImageUrl} alt="Profile" />
    //     </StyledProfileImgWrapper>
    //     <StyledChatListBoxContentWrapper>
    //       <StyledChatListBoxContent>
    //         <StyledProfileName>{name}</StyledProfileName>
    //         <StyledChatPreview>{message}</StyledChatPreview>
    //       </StyledChatListBoxContent>
    //       <StyledChatListDate>
    //         {lastDate}
    //         <MoreOptionsButton
    //           onClick={e => {
    //             e.stopPropagation(); // Prevents the outer onClick from being triggered
    //             setShowDropdown(!showDropdown);
    //           }}>
    //           ...
    //         </MoreOptionsButton>
    //         {showDropdown && (
    //           <OptionsDropdown>
    //             <OptionItem onClick={handleLeaveChat}>채팅방 나가기</OptionItem>
    //           </OptionsDropdown>
    //         )}
    //       </StyledChatListDate>
    //     </StyledChatListBoxContentWrapper>
    //   </ChatListBoxWrapper>
    // </ChatListBoxcontainer>
  );
};

export default ChatListBox;

const ChatListBoxWrapper = styled.div<{ isActive: boolean }>`
  ${tw`flex w-[396px] h-[109px] px-[15px] py-6 border-b border-gray-300 relative hover:group-hover:block`}
  ${({ isActive }) => (isActive ? tw`bg-[#E5F1FF]` : '')};
`;

const StyledProfileImg = tw.img`
  w-[60px] h-[60px] rounded-full
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

const OptionsDropdown = tw.div`
  absolute right-0 mt-2 w-28 border rounded-md shadow-md bg-white
`;

const OptionItem = tw.div`
  p-2 hover:bg-gray-200 cursor-pointer
`;

const MoreOptionsButton = tw.button`
  hidden group-hover:block ml-auto mr-4
`;

const ProfileImageContainer = styled.div`
  ${tw`relative inline-block mr-4`}
`;

// 온라인 상태 표시기
const OnlineStatusIndicator = styled.div`
  ${tw`absolute w-3 h-3 rounded-full bg-green-500`}
  right: 2px; // 위치 조정
  bottom: 1px; // 위치 조정
  border: 1px solid white; // 배경색과 구분되도록 흰색 테두리 추가
`;

// const ChatListBoxcontainer = styled.div<{ isActive: boolean }>`
//   ${tw`border-black border-2 px-[15px] py-[24px]`}
//   ${({ isActive }) => (isActive ? tw`bg-[#E5F1FF]` : '')};
// `;

// const ChatListBoxWrapper = tw.div`
//   border-black border-2 flex gap-[12px] overflow-hidden relative hover:group-hover:block
// `;

// const StyledProfileImgWrapper = tw.div`
// border-black border-2
// `;
// const StyledProfileImg = tw.img`
//   w-[60px] h-[60px] rounded-full mr-4
// `;
// const StyledChatListBoxContentWrapper = tw.div`
// border-black border-2 flex gap-[4px]
// `;
// const StyledChatListBoxContent = tw.div`
// border-black border-2
// `;

// const StyledChatListDate = tw.div`
// border-black border-2
// `;
// const StyledProfileName = tw.div`
// border-black border-2
// `;
// const StyledChatPreview = tw.div`
// border-black border-2
// `;
// const OptionsDropdown = tw.div`
//   absolute right-0 mt-2 w-28 border rounded-md shadow-md bg-white border-black
// `;

// const OptionItem = tw.div`
//   p-2 hover:bg-gray-200 cursor-pointer border-black border-2
// `;

// const MoreOptionsButton = tw.button`
//   hidden group-hover:block ml-auto mr-4 border-black border-2
// `;
