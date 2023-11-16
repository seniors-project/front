import tw from 'twin.macro';

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

function ResumeWriteButton() {
  return <StyledWriteButton>이력서 작성하기</StyledWriteButton>;
}

export default ResumeWriteButton;
