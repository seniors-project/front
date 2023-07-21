import tw from 'twin.macro';

function NewsFeedHeader() {
    return (
        <StyledNewsFeedHeader>
            <StyledProfileImg src="/images/profile.png" alt="Profile" />
                <StyledInputBox type='text' placeholder='나누고 싶은 생각이 있으신가요?'/>      
        </StyledNewsFeedHeader>
    );
}

export default NewsFeedHeader;

const StyledNewsFeedHeader = tw.div`
flex w-[600px] h-[80px] px-[15px] mt-5 py-5 border rounded-2xl bg-gray-100
`

const StyledProfileImg = tw.img`
h-[40px] ml-2 mr-5
`

const StyledInputBox = tw.input`
w-[480px] h-10 border rounded
`