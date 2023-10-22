import React from 'react';
import tw from 'twin.macro';
import { useState } from 'react';
import { ChatRoomBoxProps } from '@/types/chat';
import { useQueryClient } from '@tanstack/react-query';

function ChatInputBox({ userId, chatRoomId, ws }: ChatRoomBoxProps) {
  const [message, setMessage] = useState<string>('');
  const queryClient = useQueryClient();

  const handleSendMessage = () => {
    if (ws?.connected && message.length > 0) {
      ws.publish({
        destination: `/pub/chat/sendMessage`,
        body: JSON.stringify({
          chatRoomId: Number(chatRoomId),
          userId,
          content: message,
        }),
      });
    }
    queryClient.invalidateQueries(['chatList']);
    setMessage('');
    queryClient.invalidateQueries(['chatList']);
  };

  return (
    <StyledChatInputContainer>
      <StyledChatRoomInputBox
        rows={1}
        placeholder="메세지를 입력해 주세요."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <StyleChatSendButton onClick={handleSendMessage}>
        전송
      </StyleChatSendButton>
    </StyledChatInputContainer>
  );
}

export default ChatInputBox;
const StyledChatInputContainer = tw.div`
  w-full
  h-[134px]
  rounded-[4px]
  bg-white
  relative
  flex flex-col justify-between
`;
const StyledChatRoomInputBox = tw.textarea`
w-full h-[134px]
rounded-[4px]
pr-[100px] pl-4 py-3
resize-none
overflow-y-auto
`;
const StyleChatSendButton = tw.button`
  w-[80px]
  h-[45px]
  rounded-[4px]
  absolute bottom-4 right-4
  bg-[#0177FD]
  text-white
  flex-shrink-0 
`;
