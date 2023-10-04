import tw from 'twin.macro';
import { setCreateChatRoom } from '@/apis/chat';
import { useRouter } from 'next/router';
import { ChatButtonProps } from '@/types/chat';

function ChatButton({
  token,
  chatUserId,
  backgroundColor = 'blue',
  color = 'white',
  padding = '8px',
  fontSize = '16px',
  borderRadius = '4px',
}: ChatButtonProps) {
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
    <StyledChatButton
      style={{
        backgroundColor,
        color,
        padding,
        fontSize,
        borderRadius,
      }}
      onClick={handleChatClick}>
      채팅하기
    </StyledChatButton>
  );
}

export default ChatButton;

const StyledChatButton = tw.div`
cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80
`;
