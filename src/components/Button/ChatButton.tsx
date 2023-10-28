import styled from '@emotion/styled';
import tw from 'twin.macro';
import { setCreateChatRoom } from '@/apis/chat';
import { useRouter } from 'next/router';
import { ChatButtonProps } from '@/types/chat';

function ChatButton({ token, chatUserId, twCustom }: ChatButtonProps) {
  const router = useRouter();
  const handleChatClick = async () => {
    try {
      const response = await setCreateChatRoom(token, chatUserId);
      const roomId: number = response.data.data.roomId;

      if (roomId) {
        router.push(`/chat/${roomId}`);
      } else {
        console.error('Chat room creation response is missing data.');
      }
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  };

  return (
    <StyledChatButton twCustom={twCustom} onClick={handleChatClick}>
      채팅하기
    </StyledChatButton>
  );
}

export default ChatButton;

const StyledChatButton = styled.div<{ twCustom: string | undefined }>`
  ${({ twCustom }) =>
    twCustom
      ? tw`${twCustom}`
      : tw`h-14 font-medium  text-[#515A64] text-2xl my-auto flex ml-auto bg-[#EAECEF] rounded-sm py-3 px-9`};
`;
