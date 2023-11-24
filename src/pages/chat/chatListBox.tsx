import tw from 'twin.macro';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatListBoxProps } from '@/types/chat';
import { dateconversion } from '@/utils/dateconversion';
import { useRouter } from 'next/router';
import { setDeleteChatRoom } from '@/apis/chat';

const ChatListBoxWrapper = styled.div<{ isActive: boolean }>`
  ${tw`flex w-full h-[109px] px-[15px] py-6 border-b border-gray-300 relative hover:group-hover:block md:(w-[396px])`}
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

const ProfileImageContainer = tw.div`
  relative inline-block mr-4
`;

const OnlineStatusIndicator = styled.div<{ notification: boolean }>`
  ${tw`absolute w-3 h-3 rounded-full right-0.5 bottom-px border-2 border-white`}
  ${({ notification }) => (notification ? tw`bg-green-500` : tw`bg-red-500`)};
`;

const ChatListBox = ({
  isActive,
  onClick,
  name,
  message,
  date,
  chatRoomId,
  profileImageUrl,
  notification,
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
      onMouseEnter={() => setShowDropdown(false)}
      onMouseLeave={() => {
        setShowDropdown(false);
      }}>
      <ProfileImageContainer>
        <StyledProfileImg src={profileImageUrl} alt="Profile" />
        <OnlineStatusIndicator notification={notification} />
      </ProfileImageContainer>
      <StyledChatContent>
        <StyledProfileName>{name}</StyledProfileName>
        <StyledChatPreview>{message}</StyledChatPreview>
      </StyledChatContent>
      <StyledChatPreviewDate>{lastDate}</StyledChatPreviewDate>
      <MoreOptionsButton
        onClick={e => {
          e.stopPropagation();
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

    // html,css 반응형 컴포넌트로 리팩토링 중
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
