import tw from 'twin.macro';

import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';

import { Layout } from '@/components/Layout';

import SwitchButton from '@/components/Button/SwitchButton';
import ChatButton from '@/components/Button/ChatButton';
import { useQuery } from '@tanstack/react-query';
import { getUserResume } from '@/apis/resume';
import { useRouter } from 'next/router';
import ResumesInforBox from '@/components/Resumes/ResumesInforBox';

const StyledResumesContainer = tw.div`
  flex justify-center
`;

const StyledResumesWrapper = tw.div`
`;

const StyledPageTitle = tw.div`
  py-8
`;

const StyledPageTitleText = tw.div`
  text-[30px] mt-8 font-semibold
`;

const StyledResumesBox = tw.div`
  p-6
  flex flex-col
  bg-white
  rounded-2xl
  mb-20
  border
  border-[#DFE2E6]
`;

const StyledResumesBoxWrapper = tw.div`
  p-2
  mb-14
  mt-4
`;

const StyledResumesBoxHeader = tw.div`
  gap-y-1 grid
`;

const StyledResumesBoxImgWrap = tw.div`
  grid justify-items-center
`;

const StyledResumesBoxImg = tw.img`
  w-[120px] h-[120px] rounded-full
`;

const StyledResumesBoxHeaderRight = tw.div`
  grid justify-items-end
`;

const StyledResumesBoxHeaderTop = tw.div`
  grid grid-cols-3 grid-flow-col
`;

const StyledResumesBoxContent = tw.div`
  w-9/12
  mx-auto
`;

const StyledResumesBoxName = tw.div`
  text-[30px] flex justify-center font-bold
`;

const StyledResumesBoxWish = tw.div`
  text-[18px] flex justify-center font-semibold
`;

const StyledResumesBoxDcp = tw.div`
  text-[22px] flex justify-center text-[#515A64] font-medium
`;

const StyledResumesBoxContentTitle = tw.div`
  text-[26px] mb-2 mt-8 font-semibold
`;

const StyledResumesBoxContentLine = tw.div`
  border-t-2
  border-t-gray-300
  border-opacity-100
  space-x-4
  mt-10
`;

const StyledResumesEtc = tw.div`
  flex
  items-center
  mt-14
`;

const StyledHits = tw.div`
  text-[20px] text-[#515A64] mt-2 font-medium
`;

const StyledEtTitle = tw.div`
  text-[26px] text-[#0177FD]  ml-2 font-bold
`;

const Resumes = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(
    ['Resumes', id],
    () => {
      const roomId = Number(id);
      return getUserResume(roomId);
    },
    {
      onSuccess: data => console.log(data),
      onError: error => console.error('Failed to fetch chat data', error),
    },
  );

  const resumeData = data?.data?.data;

  return (
    <Layout>
      <StyledResumesContainer>
        <StyledResumesWrapper>
          <StyledPageTitle>
            <StyledPageTitleText>
              {resumeData?.name}님의 이력서 페이지 입니다.
            </StyledPageTitleText>
          </StyledPageTitle>
          <StyledResumesBox>
            <StyledResumesBoxWrapper>
              <StyledResumesBoxHeader>
                <StyledResumesBoxHeaderTop>
                  <div></div>
                  <StyledResumesBoxImgWrap>
                    <StyledResumesBoxImg
                      src={resumeData?.photoUrl}
                      alt="Profile"
                    />
                  </StyledResumesBoxImgWrap>
                  <StyledResumesBoxHeaderRight>
                    <ChatButton chatUserId={resumeData?.id} />
                    <StyledHits>조회수 {resumeData?.viewCount}회</StyledHits>
                  </StyledResumesBoxHeaderRight>
                </StyledResumesBoxHeaderTop>
                <StyledResumesBoxName>{resumeData?.name}</StyledResumesBoxName>
                <StyledResumesBoxWish>
                  {resumeData?.occupation}
                </StyledResumesBoxWish>
                <StyledResumesBoxDcp>
                  {resumeData?.introduce}
                </StyledResumesBoxDcp>
              </StyledResumesBoxHeader>
              <StyledResumesBoxContent>
                <ResumesInforBox
                  title="경력 사항"
                  period={resumeData?.careers[0]?.startedAt}
                  subPeriod={resumeData?.careers[0]?.company}
                  content={resumeData?.careers[0]?.title}
                  subContent={resumeData?.careers[0]?.content}
                />
                <ResumesInforBox
                  title="교육 이수"
                  period={resumeData?.educations[0]?.startedAt}
                  subPeriod={resumeData?.educations[0]?.content}
                  content={resumeData?.educations[0]?.institution}
                  subContent={resumeData?.educations[0]?.process}
                />
                <ResumesInforBox
                  title="자격증"
                  period={resumeData?.certificates[0]?.startedAt}
                  subPeriod={resumeData?.certificates[0]?.company}
                  content={resumeData?.certificates[0]?.name}
                  subContent={resumeData?.certificates[0]?.rating}
                />
                <StyledResumesBoxContentTitle>
                  그 외
                </StyledResumesBoxContentTitle>
                <StyledResumesBoxContentLine>
                  <StyledResumesEtc>
                    <SwitchButton />
                    <StyledEtTitle>이력서 공개 중</StyledEtTitle>
                  </StyledResumesEtc>
                  <StyledHits>
                    현재 내 이력서가 다른 회원들에게 보여지고 있어요.
                  </StyledHits>
                </StyledResumesBoxContentLine>
              </StyledResumesBoxContent>
            </StyledResumesBoxWrapper>
          </StyledResumesBox>
        </StyledResumesWrapper>
      </StyledResumesContainer>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context.req.headers.cookie || '');

  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await userValidate(accessToken);
    return {
      props: { user: response.data, token: accessToken },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};

export default Resumes;
