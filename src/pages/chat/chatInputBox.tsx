import React from 'react';
import tw from 'twin.macro';
import { useState } from 'react';

function ChatInputBox({ userId, chatRoomId }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    fetch('http://strangehoon.shop/api/pub/chat/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatRoomId: Number(chatRoomId[0]),
        userId,
        content: message,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Message sent successfully:', data);
        setMessage(''); // 메시지 전송 후 입력란 지우기
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };
  return (
    <StyledChatInputContainer>
      <StyledChatRoomInputBox
        rows={1}
        placeholder="메세지를 입력해 주세요."
        value={message}
        onChange={e => setMessage(e.target.value)}
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
`;
const StyledChatRoomInputBox = tw.textarea`
  w-full h-full rounded-[4px]
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
`;
