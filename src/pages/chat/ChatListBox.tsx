import tw from "twin.macro";

function ChatListBox () {
    return (
        <StyledChatListBox>
            <StyledProfileImg src="/images/profile.png" alt="Profile" />
            <>
                <StyledProfileName>홍길동</StyledProfileName>
                <StyledChatPriview>안녕하세요. 이력서 보고...</StyledChatPriview>
            </>
            <StyledChatPriviewDate>12월 23일</StyledChatPriviewDate>
        </StyledChatListBox>
    );
}

export default ChatListBox;

const StyledChatListBox = tw.div`
w-[396px] h-[109px] space-y-[10px] px-[15px] py-6 border-b border-gray-300
`

const StyledProfileImg = tw.img`
w-[60px] h-[60px] rounded-full
`

const StyledProfileName = tw.div`
`

const StyledChatPriview = tw.div`
`

const StyledChatPriviewDate = tw.div`
`
