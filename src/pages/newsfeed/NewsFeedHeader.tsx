import tw from 'twin.macro';
import { pretenderedBold } from '../../styles/fonts/index'

function NewsFeedHeader() {
    return (
        <>
        <StyledNewsFeedHeader>함께 나누고 싶은 이야기가 있나요?</StyledNewsFeedHeader>
        <StyledWriteBtn>글 작성하기</StyledWriteBtn>
        </>
    );
}

export default NewsFeedHeader;

const StyledNewsFeedHeader = tw.div`
font-bold text-xl  mt-7 mb-3 
`

const StyledWriteBtn = tw.button`
font-semibold text-lg border rounded border-[#0177FD] bg-[#0177FD] text-white px-11 py-2
`
