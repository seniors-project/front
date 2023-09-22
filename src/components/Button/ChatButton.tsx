import tw from 'twin.macro';
import { setCreateChatRoom } from '@/apis/chat';
import { useRouter } from 'next/router';

interface ChatButtonProps {
  token: string;
  chatUserId: number;
}

function ChatButton({ token, chatUserId }: ChatButtonProps) {
  const router = useRouter();
  const handleChatClick = async () => {
    try {
      const response = await setCreateChatRoom(token, chatUserId);

      console.log('Chat room created:', response);

      router.push(`/chat/${chatUserId}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  };

  return (
    <StyledChatButton onClick={handleChatClick}>채팅하기</StyledChatButton>
  );
}

export default ChatButton;

const StyledChatButton = tw.div`
`;
