import tw from "twin.macro";

function ChatRoom() {
    return (
        <StyledChatRoomBox></StyledChatRoomBox>
    );
}

export default ChatRoom;

const StyledChatRoomBox = tw.div`
w-[803px]
h-[821px]
rounded-tr-[20px]
bg-[#dfe2e6]
`;