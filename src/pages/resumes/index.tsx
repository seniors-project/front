import tw from 'twin.macro';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import Image from 'next/image';

import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';

import { Layout } from '@/components/Layout';
import { Container } from '@/styles';

const RegisterResumeBanner = tw.div`
  py-10 bg-white
`;

const Description = tw.div`
  font-semibold text-3xl leading-10
`;

const BtnWapper = tw.div`
  mt-6
`;

const RegisterResumeBtn = tw.button`
  h-16
  w-80
  border-none
  bg-primary-main
  text-white
  font-bold
  text-2xl
  rounded-lg
`;

const ResumeList = tw.div`
  mt-9
`;

const ResumeCard = tw.div`
  mt-4
  bg-white
  rounded-xl
  shadow-xl
  shadow-gray-200
`;

const ResumeCardHeader = tw.div`
  flex px-6 py-4
`;
const ResumeCardHeaderProfileImg = tw.div`
  w-20
  h-20
  rounded-full
  overflow-hidden
  bg-amber-500
  mr-2
`;
const ResumeCardHeaderProfile = tw.div`
  p-2
`;
const ResumeCardChatButton = tw.div`
  w-48
  h-14
  font-medium
  text-[#515A64]
  text-2xl
  my-auto
  flex
  ml-auto
  bg-[#EAECEF]
  rounded-sm
`;

const ResumeCardBody = tw.div`
  border-t p-6
`;
const ResumeDe = tw.div`
  font-medium 
  text-2xl
  mb-6
  leading-9
`;
const ResumeHistory = tw.div`
  border-t-2 font-regular text-2xl
`;
const ResumeHistoryLi = tw.div`
  flex mt-4
`;
const HistoryPeriod = tw.div`
  w-60 mr-14
`;

const ResumeListPage = () => {
  return (
    <Layout>
      <RegisterResumeBanner>
        <Container>
          <Description>
            <p>
              인생 2모작에 도전하는 <br />
              시니어스에 이력서를 등록해 보세요!
            </p>
          </Description>
          <BtnWapper>
            <RegisterResumeBtn>공개 이력서 등록하기</RegisterResumeBtn>
          </BtnWapper>
        </Container>
      </RegisterResumeBanner>

      <Container>
        <ResumeList>
          <div>
            <h2 tw="font-semibold text-3xl">전체 목록</h2>
          </div>
          <ResumeCard>
            <ResumeCardHeader>
              <ResumeCardHeaderProfileImg>
                <Image
                  src="/images/logo.png"
                  alt="logo picture"
                  width={500}
                  height={100}
                />
              </ResumeCardHeaderProfileImg>
              <ResumeCardHeaderProfile>
                <p tw="font-bold text-2xl">홍길동</p>
                <div tw="flex flex-nowrap mt-1">
                  <p tw="font-semibold text-base">하드웨어</p>
                  <p tw="font-medium text-base text-[#878E95] ml-1.5">선호</p>
                </div>
              </ResumeCardHeaderProfile>
              <ResumeCardChatButton>
                <button tw="mx-auto">채팅하기</button>
              </ResumeCardChatButton>
            </ResumeCardHeader>
            <ResumeCardBody>
              <ResumeDe>
                <p>
                  안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                  부탁드립니다.안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                  부탁드립니다.안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                  부탁드립니다.안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                  글자수로 짤라 ~~~
                  <span>...</span>
                  <span tw="text-slate-500 cursor-pointer">더보기</span>
                </p>
              </ResumeDe>
              <ResumeHistory>
                <ul>
                  <ResumeHistoryLi>
                    <HistoryPeriod>2022.04 ~ 재직중</HistoryPeriod>
                    <div>뫄뫄IT 기업</div>
                  </ResumeHistoryLi>
                  <ResumeHistoryLi>
                    <HistoryPeriod>2022.01 ~ 2022.04</HistoryPeriod>
                    <div>뫄뫄스타트업 자문위원</div>
                  </ResumeHistoryLi>
                </ul>
              </ResumeHistory>
            </ResumeCardBody>
          </ResumeCard>
        </ResumeList>
      </Container>
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
      props: { user: response.data },
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

export default ResumeListPage;
