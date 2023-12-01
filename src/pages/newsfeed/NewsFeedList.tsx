import tw from 'twin.macro';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

import { useQuery } from '@tanstack/react-query';
import { getNewsfeedList } from '@/apis/newsfeed';
import { getNewsfeed } from '@/apis/newsfeed';

function NewsFeedList() {
  const {
    data: newsFeedData,
    isLoading,
    error,
  } = useQuery(['newsFeedList'], async () => {
    const response = await getNewsfeedList();
    const newsFeedList = response.data.list;
    const nickname = newsFeedList[0].users.nickname;
    const profileimg = newsFeedList[0].users.profileImageUrl;
    const title = newsFeedList[0].title;
    const content = newsFeedList[0].content;
    const likestatus = newsFeedList[0].likestatus;

    console.log(newsFeedList);
    return { newsFeedList, nickname, profileimg, title, content, likestatus };
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!!!</p>;
  }
  const nickname = newsFeedData?.nickname;
  const profileimg = newsFeedData?.profileimg;
  const title = newsFeedData?.title;
  const content = newsFeedData?.content;
  const likestauts = newsFeedData?.likestatus;

  // const {} = useQuery(['newsFeed'], async () => {
  //   const response = await getNewsfeed(1);
  //   const newsFeed = response.data;

  //   return { newsFeed };
  // });

  return (
    <div>
      <StyledNewsFeedList>
        <StyledProfileImg src={profileimg} alt="Profile" />

        <StyledProfileBox>
          <StyledCreatedTime></StyledCreatedTime>
          <StyledProfileName>{nickname}</StyledProfileName>
          <StyledProfileDetail>?분야 선호</StyledProfileDetail>
          <StyledTitle>{title}</StyledTitle>
          <StyledDetail>{content}</StyledDetail>
          <StyledShowLike>좋아요 {likestauts}개</StyledShowLike>
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
    </div>
  );
}

export default NewsFeedList;

const StyledNewsFeedList = tw.div`
flex w-[600px] h-[300px] px-[15px] mt-5 py-5 border rounded-2xl bg-gray-100
`;
const StyledProfileImg = tw.img`
h-[40px] ml-2 mr-5
`;
const StyledCreatedTime = tw.div`
 
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
