"use client";

import tw from "twin.macro";

export function ResumeWriteButton() {
    return <StyledWriteButton>이력서 작성하기</StyledWriteButton>;
}

export function ChatSendButton() {
    return <StyleChatSendButton>전송</StyleChatSendButton>;
}

const StyledWriteButton = tw.button`
w-[193px] 
h-[58px] 
rounded-[4px] 
space-x-2.5
px-[24px] 
py-[16px] 
bg-[#0177FD] 
text-white
`;

const StyleChatSendButton = tw.button`
w-[80px]
h-[45px]
rounded-[4px]
space-x-2.5
px-[24px]
py-[12px]
bg-[#0177FD]
text-white
`;