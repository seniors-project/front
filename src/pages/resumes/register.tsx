import tw from 'twin.macro';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/Ai';

import { userValidate } from '@/apis/auth';
import parseCookies from '@/utils/parseCookies';
import {
  ResumeForm,
  ResumeFormCareer,
  ResumeFormCertificate,
  ResumeFormEducation,
} from '@/types/resumeForm';
import { postResume } from '@/apis/resume';
import CareeListModal from '@/components/Modal/resume/CareeListModal';
import EducationListModal from '@/components/Modal/resume/EducationListModal';
import CertificateListModal from '@/components/Modal/resume/CertificateModal';
import { SwitchLabel } from '@/styles/Switch';
import { Career, Certificate, Education } from '@/types/resume';

import { Layout } from '@/components/Layout';
import { Container } from '@/styles';

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
const ResumeProfileAddBtn = tw.label`
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
const NameInputLabel = tw.div`mb-3`;
const NameInput = tw.input`
  focus:outline-none rounded-lg
  w-full h-16 border p-2 bg-[#F1F3F5]
  placeholder:text-[#878E95] placeholder:font-medium text-2xl
`;
const ProfileInfoList = tw.div``;
const InfoInputWrap = tw.div`
  flex m-auto mt-10
`;
const BtnWapper = tw.div`
  w-40 h-11 flex
  items-center justify-center
  p-2 ml-auto bg-blue-500 rounded
  text-white text-xl font-semibold
`;

const OpenMYResumeSection = tw.div` flex`;
const SwitchWrap = tw.div`
  mt-2 w-11 h-11
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
// const TemporaryBtn = tw.div`
//   w-40 h-11 flex
//   items-center justify-center
//   p-2 bg-[#EAECEF] rounded
//   text-[#515A64] text-xl font-semibold
// `;

const ResumeRegisterPage = ({ token }: { token: string }) => {
  const router = useRouter();
  const [imgFile, setImgFile] = useState<string | ArrayBuffer | null>('');
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    // errors,
  } = useForm<ResumeForm>();
  const [showCareeModal, setShowCareeModal] = useState<boolean>(false);
  const [showEducationModal, setShowEducationModal] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] =
    useState<boolean>(false);
  const [careerList, setCareerList] = useState<ResumeFormCareer[]>([]);
  const [educationList, setEducationList] = useState<ResumeFormEducation[]>([]);
  const [certificateList, setCertificateList] = useState<
    ResumeFormCertificate[]
  >([]);

  const onSubmit = async (data: ResumeForm) => {
    console.log('onSubmitdata' + data);
    console.log(
      'onSubmitdata 최종' +
        {
          ...data,
          careerList,
          educationList,
        },
    );

    // 필수값 체크
    if (!data.name) {
      alert('성함은 필수 입력값입니다.');
      return;
    }
    if (!data.occupation) {
      alert('직종은 필수 입력값입니다.');
      return;
    }
    try {
      const response = await postResume(token, {
        ...data,
        careerList,
        educationList,
      });
      if (response.status === 200) {
        alert('이력서 등록이 완료되었습니다.');
        router.push('/resumes');
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        alert('이미 해당 유저의 이력서가 존재합니다.');
      } else {
        alert('이력서 등록에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleSaveImgFileChange = () => {
    // 이미지 업로드
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
      };

      setValue('image', file);
    }
  };

  const handleCareerListData = (data: Career) => {
    const careerListData = [...careerList, data];
    setCareerList(careerListData);
  };

  const handleEducationListData = (data: Education) => {
    const educationListData = [...educationList, data];
    setEducationList(educationListData);
  };

  const handleCertificateListData = (data: Certificate) => {
    const certificateListData = [...certificateList, data];
    setCertificateList(certificateListData);
  };

  return (
    <Layout>
      <Container>
        <ResumeAddHeader>이력서를 입력해 주세요</ResumeAddHeader>
        <Wrap>
          <ResumeAddBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ResumeProfileImgAdd>
                {imgFile ? (
                  <ResumeProfileImg>
                    <Image
                      src={imgFile as string}
                      alt="profile img"
                      width={120}
                      height={120}
                    />
                  </ResumeProfileImg>
                ) : (
                  <ResumeProfileImg>
                    <Image
                      src="/images/basicProfile.png"
                      alt="default profile img"
                      width={120}
                      height={120}
                    />
                  </ResumeProfileImg>
                )}
                <ResumeProfileAddBtn htmlFor="profileImg">
                  사진 등록하기
                </ResumeProfileAddBtn>
                <input
                  {...register('image')}
                  id="profileImg"
                  type="file"
                  tw="hidden"
                  accept="image/*"
                  ref={imgRef}
                  onChange={handleSaveImgFileChange}
                />
              </ResumeProfileImgAdd>
              <AboutMeTextWrap>
                <AboutMeText
                  placeholder="간단한 자기 소개글을 입력해 주세요."
                  {...register('introduce', { maxLength: 100 })}
                />
              </AboutMeTextWrap>
              <section>
                <IdentityDetailCard>
                  <NameInputLabel>
                    <InputLabel>성함</InputLabel>
                    <span tw="text-[#E15241]"> *</span>
                  </NameInputLabel>
                  <NameInput
                    maxLength={20}
                    placeholder=" 본명을 입력해 주세요."
                    {...register('name')}
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
                    {...register('occupation')}
                  />
                </IdentityDetailCard>
              </section>
              <div tw="border my-[48px] border-[#AEB5BC]" />
              <ProfileInfoList>
                <InfoInputWrap>
                  <InputLabel>경력 사항</InputLabel>
                  <BtnWapper>
                    <AiFillPlusCircle />
                    <div tw="ml-1" onClick={() => setShowCareeModal(true)}>
                      추가하기
                      {/* <input
                        type="hidden"
                        value={careerList}
                        data={...register('careerList')}
                      /> */}
                    </div>
                  </BtnWapper>
                  {showCareeModal && (
                    <CareeListModal
                      onClose={() => setShowCareeModal(false)}
                      handleCareerListData={handleCareerListData}
                    />
                  )}
                </InfoInputWrap>
                {careerList.length > 0 && (
                  <ul>
                    {careerList.map((career, index) => (
                      <li
                        key={index}
                        tw="flex flex-col mt-4  font-regular text-2xl text-[#515A64]">
                        <div tw="flex font-regular text-2xl">
                          <div tw="w-60 mr-14">
                            {career.startedAt} ~{' '}
                            {career.endedAt ? career.endedAt : '재직중'}
                          </div>
                          <div tw="font-semibold text-black">
                            {career.company}
                          </div>
                        </div>
                        <div tw="flex">
                          <div tw="w-60 mr-14">{career.title}</div>
                          <div>{career.content}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <InfoInputWrap>
                  <InputLabel>교육 이수</InputLabel>
                  <BtnWapper>
                    <AiFillPlusCircle />
                    <div tw="ml-1" onClick={() => setShowEducationModal(true)}>
                      추가하기
                    </div>
                    {showEducationModal && (
                      <EducationListModal
                        onClose={() => setShowEducationModal(false)}
                        handleEducationListData={handleEducationListData}
                      />
                    )}
                  </BtnWapper>
                </InfoInputWrap>
                {educationList.length > 0 && (
                  <ul>
                    {educationList.map((education, index) => (
                      <li
                        key={index}
                        tw="flex flex-col mt-4  font-regular text-2xl text-[#515A64]">
                        <div tw="flex font-regular text-2xl">
                          <div tw="w-60 mr-14">
                            {education.startedAt} ~{' '}
                            {education.endedAt ? education.endedAt : '진행중'}
                          </div>
                          <div tw="font-semibold text-black">
                            {education.institution}
                          </div>
                        </div>
                        <div tw="flex">
                          <div tw="w-60 mr-14">{education.process}</div>
                          <div>{education.content}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <InfoInputWrap>
                  <InputLabel>자격증</InputLabel>
                  <BtnWapper>
                    <AiFillPlusCircle />
                    <div
                      tw="ml-1"
                      onClick={() => setShowCertificateModal(true)}>
                      추가하기
                    </div>
                    {showCertificateModal && (
                      <CertificateListModal
                        onClose={() => setShowCertificateModal(false)}
                        handleCertificateListData={handleCertificateListData}
                      />
                    )}
                  </BtnWapper>
                </InfoInputWrap>
                {certificateList.length > 0 && (
                  <ul>
                    {certificateList.map((certificate, index) => (
                      <li
                        key={index}
                        tw="flex flex-col mt-4  font-regular text-2xl text-[#515A64]">
                        <div tw="flex font-regular text-2xl">
                          <div tw="w-60 mr-14">
                            {certificate.issuedYear
                              ? `${certificate.issuedYear}.${certificate.issuedMonth}`
                              : '발행예정'}
                          </div>
                          <div tw="font-semibold text-black">
                            {certificate.name}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </ProfileInfoList>
              <div tw="border my-[48px] border-[#AEB5BC]" />
              <OpenMYResumeSection>
                <SwitchWrap>
                  <SwitchLabel>
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      {...register('isOpened')}
                    />
                    <span className="slider round"></span>
                  </SwitchLabel>
                </SwitchWrap>
                <SwitchDescriptionWrap>
                  <InputLabel>이력서 공개하기</InputLabel>
                  <SwitchDescription>
                    이력서를 공개할 경우, 나에게 관심있는 회원이 내 이력서를 볼
                    수 있어요.
                  </SwitchDescription>
                </SwitchDescriptionWrap>
              </OpenMYResumeSection>
              <FormBtnWrap>
                {/* <TemporaryBtn>임시저장</TemporaryBtn> */}
                <BtnWapper>
                  <button type="submit" disabled={isSubmitting}>
                    등록하기
                  </button>
                </BtnWapper>
              </FormBtnWrap>
            </form>
          </ResumeAddBody>
        </Wrap>
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

export default ResumeRegisterPage;
