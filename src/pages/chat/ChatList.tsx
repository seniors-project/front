import tw from "twin.macro";

import { ResumeWriteButton } from "./ChatButton";
import ChatListBox from "./ChatListBox";

function ChatList() {
  return (
    <StyledChatListContainer>
      <StyledChatListBoxUpText>채팅 목록</StyledChatListBoxUpText>
      <StyledGrayLine />
      <ChatListBox />
      <StyledContent>
        <StyledChatListBoxDownText>공개 이력서에서<br/>인맥을 쌓고 채팅을 해 보세요!</StyledChatListBoxDownText>
        <ResumeWriteButton />
      </StyledContent>
    </StyledChatListContainer>
  );
}

export default ChatList;

const StyledChatListContainer = tw.div`
w-[396px] h-[820px] rounded-tl-[20px] bg-white flex flex-col border-t border-l border-gray-300
`

const StyledGrayLine = tw.div`
w-full border-t border-gray-300
`

const StyledChatListBoxUpText = tw.div`
w-full mb-4 my-[30px] ml-[24px]
`

const StyledChatListBoxDownText = tw.div`
w-full text-center mb-4
`
const StyledContent = tw.div`
flex-grow flex flex-col justify-center items-center
`
