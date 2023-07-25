import tw from 'twin.macro';

import { Layout } from '@/components/Layout';

const RegisterResumeBanner = tw.div`
  w-3/5 h-48
`;

const Description = tw.div`
  font-semibold
  text-3xl
  leading-10
`;

const BtnWapper = tw.div`
  mt-8
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
  mt-7
`;

const ResumeCard = tw.div`
  mt-4 border-solid
`;

const ResumeCardHeader = tw.div`
  flex p-4
`;
const ResumeCardHeaderProfileImg = tw.div`
  w-20
  h-20
  rounded-full
  overflow-hidden
  bg-amber-500
`;
const ResumeCardHeaderProfile = tw.div`
  p-2
`;
const ResumeCardChatButton = tw.div`
  font-medium
  text-[#515A64]
  text-2xl
  my-auto
  flex
  ml-auto
`;

const ResumeCardBody = tw.div`
  
`;

const ResumeDe = tw.div`

`;

const ResumeHistory = tw.div`
`;

const ResumeListPage = () => {
  return (
    <Layout>
      <div>
        <RegisterResumeBanner>
          <Description>
            <p>
              인생 2모작에 도전하는 <br />
              시니어스에 이력서를 등록해 보세요!
            </p>
          </Description>
          <BtnWapper>
            <RegisterResumeBtn>공개 이력서 등록하기</RegisterResumeBtn>
          </BtnWapper>
        </RegisterResumeBanner>
      </div>
      <ResumeList>
        <div>
          <h2 tw="font-semibold text-3xl">전체 목록</h2>
        </div>
        <ResumeCard>
          <ResumeCardHeader>
            <ResumeCardHeaderProfileImg>
              <img src="/images/logo.png" />
            </ResumeCardHeaderProfileImg>
            <ResumeCardHeaderProfile>
              <p tw="font-bold text-2xl">홍길동</p>
              <div tw="flex flex-nowrap">
                <p tw="font-semibold text-base">하드웨어</p>
                <p tw="font-medium text-base text-[#878E95] ml-1.5">선호</p>
              </div>
            </ResumeCardHeaderProfile>
            <ResumeCardChatButton>
              <button>채팅하기</button>
            </ResumeCardChatButton>
          </ResumeCardHeader>
          <ResumeCardBody>
            <ResumeDe>
              <p>
                안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                부탁드립니다.안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                부탁드립니다.안녕하세요. 홍길동입니다. 잘 부탁드립니다. 잘
                부탁드립....
              </p>
            </ResumeDe>
            <ResumeHistory>
              <ul>
                <li>
                  <div>2022.04 ~ 재직중</div>
                  <div>뫄뫄IT 기업</div>
                </li>
                <li>
                  <div>2022.01 ~ 2022.04</div>
                  <div>뫄뫄스타트업 자문위원</div>
                </li>
              </ul>
            </ResumeHistory>
          </ResumeCardBody>
        </ResumeCard>
      </ResumeList>
    </Layout>
  );
};

export default ResumeListPage;
