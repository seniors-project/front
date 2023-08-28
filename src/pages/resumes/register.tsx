import tw from 'twin.macro';
import Image from 'next/image';
import { AiFillPlusCircle } from 'react-icons/Ai';

import { Layout } from '@/components/Layout';
import { Container } from '@/styles';
import Switch from '@/components/Switch/Switch';

const ResumeAddHeader = tw.div`
  font-semibold text-3xl mt-16 mb-8
`;

const Wrap = tw.div`
  max-w-[1200px] bg-white border rounded-2xl shadow-xl
`;

const ResumeAddBody = tw.div`
  max-w-3xl m-auto my-12
`;

const ResumeProfileImgAdd = tw.div`
flex flex-col items-center
`;
const ResumeProfileImg = tw.div`
  w-32 h-32
  rounded-full
  overflow-hidden
  mr-2 mb-4
`;
const ResumeProfileBtn = tw.div`
  w-[150px]
  bg-[#0177FD]
  font-semibold text-white text-lg text-center
  rounded-md
  py-2 px-4
`;

const AboutMeTextWrap = tw.div`
  max-w-full max-h-44 my-5
`;
const AboutMeText = tw.textarea`
  resize-none focus:outline-none rounded-lg
  w-full h-40 border p-2 bg-[#F1F3F5]
  placeholder:text-[#878E95] placeholder:font-medium text-2xl
`;

const InputLabel = tw.span`
  text-[26px] font-semibold
`;

const IdentityDetailCard = tw.div`mb-5`;
const NameInputLabel = tw.div`
  mb-3
`;
const NameInput = tw.input`
  focus:outline-none rounded-lg
  w-full h-16 border p-2 bg-[#F1F3F5]
  placeholder:text-[#878E95] placeholder:font-medium text-2xl
`;
const ProfileInfoList = tw.div``;
const CareerInput = tw.div`flex m-auto`;
const BtnWapper = tw.div`
  w-40 h-11 flex
  items-center justify-center
  p-2 ml-auto bg-blue-500 rounded
  text-white text-xl font-semibold
`;

const OpenMYResumeSection = tw.div` flex`;
const SwitchWrap = tw.div`
  w-11 h-11
`;
const SwitchDescriptionWrap = tw.div`
  ml-5
`;
const SwitchDescription = tw.div`
  font-medium mt-2
`;

const FormBtnWrap = tw.div`
  flex mx-auto max-w-sm my-16
  `;
const TemporaryBtn = tw.div`
  w-40 h-11 flex
  items-center justify-center
  p-2 bg-[#EAECEF] rounded
  text-[#515A64] text-xl font-semibold
`;

const ResumeAddPage = () => {
  return (
    <Layout>
      <Container>
        <ResumeAddHeader>이력서를 입력해 주세요</ResumeAddHeader>
        <Wrap>
          <ResumeAddBody>
            <ResumeProfileImgAdd>
              <ResumeProfileImg>
                <Image
                  src="/images/basicProfile.png"
                  alt="logo picture"
                  width={120}
                  height={120}></Image>
              </ResumeProfileImg>
              <ResumeProfileBtn>사진 등록하기</ResumeProfileBtn>
            </ResumeProfileImgAdd>
            <AboutMeTextWrap>
              <AboutMeText
                maxLength={100}
                placeholder="간단한 자기 소개글을 입력해 주세요."
              />
            </AboutMeTextWrap>
            <div>
              <IdentityDetailCard>
                <NameInputLabel>
                  <InputLabel>성함</InputLabel>
                  <span tw="text-[#E15241]"> *</span>
                </NameInputLabel>
                <NameInput
                  maxLength={20}
                  placeholder=" 본명을 입력해 주세요."
                />
              </IdentityDetailCard>
              <IdentityDetailCard>
                <NameInputLabel>
                  <InputLabel>직종</InputLabel>
                  <span tw="text-[#E15241]"> *</span>
                </NameInputLabel>
                <NameInput
                  maxLength={20}
                  placeholder=" 선호하는 직종 혹은 현재 직종을 입력해 주세요."
                />
              </IdentityDetailCard>
            </div>
            <div tw="border my-[48px] border-[#AEB5BC]" />
            <ProfileInfoList>
              <CareerInput>
                <InputLabel>경력 사항</InputLabel>
                <BtnWapper>
                  <AiFillPlusCircle />
                  <button tw="ml-1">추가하기</button>
                </BtnWapper>
              </CareerInput>
            </ProfileInfoList>
            <div tw="border my-[48px] border-[#AEB5BC]" />
            <OpenMYResumeSection>
              <SwitchWrap>
                <Switch></Switch>
              </SwitchWrap>
              <SwitchDescriptionWrap>
                <InputLabel>이력서 공개하기</InputLabel>
                <SwitchDescription>
                  이력서를 공개할 경우, 나에게 관심있는 회원이 내 이력서를 볼 수
                  있어요.
                </SwitchDescription>
              </SwitchDescriptionWrap>
            </OpenMYResumeSection>
          </ResumeAddBody>
          <FormBtnWrap>
            <TemporaryBtn>임시저장</TemporaryBtn>
            <BtnWapper>등록하기</BtnWapper>
          </FormBtnWrap>
        </Wrap>
      </Container>
    </Layout>
  );
};

export default ResumeAddPage;
