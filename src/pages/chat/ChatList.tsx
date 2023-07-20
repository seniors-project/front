import tw from "twin.macro";

function ChatList() {
  return (
    <>
      <StyledChatListBox>
        <StyledChatListBoxUpText>Chat list</StyledChatListBoxUpText>
        <StyledGrayLine />
        <StyledChatListBoxDownText>Connect and chat on the<br/>public resume</StyledChatListBoxDownText>
      </StyledChatListBox>
    </>
  );
}

export default ChatList;

const StyledChatListBox = tw.div`
w-[396px] h-[820px] rounded-2xl bg-white relative
`

const StyledGrayLine = tw.div`
w-full absolute top-[92px] left-0 border-t border-gray-300
`

const StyledChatListBoxUpText = tw.div`
absolute top-[30px] left-[24px] w-[99px] h-[31px]
`

const StyledChatListBoxDownText = tw.div`
absolute top-[332px] left-[55px] text-center
`