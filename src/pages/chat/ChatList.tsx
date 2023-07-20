import tw from "twin.macro";
import { ResumeWriteButton } from "./ChatButton";

function ChatList() {
  return (
    <StyledChatListBox>
      <StyledChatListBoxUpText>채팅 목록</StyledChatListBoxUpText>
      <StyledGrayLine />
      <StyledContent>
        <StyledChatListBoxDownText>공개 이력서에서<br/>인맥을 쌓고 채팅을 해 보세요!</StyledChatListBoxDownText>
        <ResumeWriteButton />
      </StyledContent>
    </StyledChatListBox>
  );
}

export default ChatList;

const StyledChatListBox = tw.div`
w-[396px] h-[820px] rounded-2xl bg-white flex flex-col
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
