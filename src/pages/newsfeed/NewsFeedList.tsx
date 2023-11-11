import tw from 'twin.macro';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

function NewsFeedList() {
  return (
    <StyledNewsFeedList>
      <StyledProfileImg src="/images/profile.png" alt="Profile" />

      <StyledProfileBox>
        <StyledProfileName>청바지</StyledProfileName>
        <StyledProfileDetail>?분야 선호</StyledProfileDetail>
        <StyledTitle> 제목</StyledTitle>
        <StyledDetail>내용</StyledDetail>
        <StyledShowLike>좋아요 ?개</StyledShowLike>
        <StyledLike>
          <ThumbUpOffAltIcon />
          &nbsp;&nbsp;좋아요
        </StyledLike>
      </StyledProfileBox>
      <StyledComment>
        <ChatBubbleOutlineIcon />
        &nbsp;&nbsp;댓글 달기
      </StyledComment>
      <StyledShare>
        <ShareIcon />
        &nbsp;&nbsp;공유 하기
      </StyledShare>
    </StyledNewsFeedList>
  );
}

export default NewsFeedList;

const StyledNewsFeedList = tw.div`
flex w-[600px] h-[300px] px-[15px] mt-5 py-5 border rounded-2xl bg-gray-100
`;
const StyledProfileImg = tw.img`
h-[40px] ml-2 mr-5
`;
const StyledProfileBox = tw.div`
flex-col
`;
const StyledProfileName = tw.div`
font-medium text-lg
`;
const StyledProfileDetail = tw.div`
font-medium text-sm mb-2  
`;
const StyledTitle = tw.div`
font-bold text-3xl mb-2  
`;
const StyledDetail = tw.div`
font-medium text-lg mb-14
`;
const StyledShowLike = tw.div`
font-medium text-sm  
`;
const StyledLike = tw.button`
font-bold text-sm mt-5
`;
const StyledComment = tw.button`
font-bold text-sm mt-[218px] ml-[50px]
`;
const StyledShare = tw.button`
font-bold text-sm mt-[218px] ml-[50px]
`;
