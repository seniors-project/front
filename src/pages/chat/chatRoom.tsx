import Modal from '@/components/Modal/Modal';
import InquiryModal from '@/components/Modal/InquiryModal';
import { useState } from 'react';
import tw from 'twin.macro';

function ChatRoom() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledChatRoomBox>
      <StyledMessagesContainer>
        <StyledChatRoomDate>23년 12월 23일 (목)</StyledChatRoomDate>
        <StyledMessageBox>
          안녕하세요. 이력서 보고 연락드립니다. 임꺽정님께 부천지사 핸들링
          포지션을 제안드리고 싶습니다.
        </StyledMessageBox>
      </StyledMessagesContainer>
      <div>
        <button onClick={() => setIsOpen(true)}>Open modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size={{ width: '732px', height: '890px' }}>
          <InquiryModal />
        </Modal>
      </div>
      <StyledChatInputContainer>
        <StyledChatRoomInputBox
          rows={1}
          placeholder="메세지를 입력해 주세요."
        />
        <StyleChatSendButton>전송</StyleChatSendButton>
      </StyledChatInputContainer>
    </StyledChatRoomBox>
  );
}

export default ChatRoom;

const StyledChatRoomBox = tw.div`
  w-[803px]
  h-[821px]
  rounded-tr-[20px]
  bg-[#dfe2e6]
  flex flex-col justify-between p-6
`;

const StyledMessagesContainer = tw.div`
  flex flex-col items-start justify-start
  w-full
  overflow-y-auto
`;

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

const StyledChatRoomDate = tw.div`
w-[211px] h-[44px] rounded-[100px] bg-gray-200 text-gray-300 flex justify-center items-center self-center
`;

const StyledMessageBox = tw.div`
  max-w-[60%]
  bg-white
  text-black
  px-4 py-2
  my-6
  rounded-lg
`;
