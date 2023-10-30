import tw from 'twin.macro';
import styled from '@emotion/styled';

import { Layout } from '@/components/Layout';

import {
  pretenderedSemiBold,
  pretenderedBold,
  pretenderedMedium,
  pretenderedRegular,
} from '@/styles/fonts';
import SwitchButton from '@/components/Button/SwitchButton';

const Resumes = () => {
  return (
    <Layout>
      <StyledResumesContainer>
        <StyledResumesWrapper>
          <StyledPageTitle>
            <StyledPageTitleText>
              홍길동님의 이력서 페이지 입니다.
            </StyledPageTitleText>
          </StyledPageTitle>
          <StyledResumesBox>
            <StyledResumesBoxWrapper>
              <StyledResumesBoxHeader>
                <StyledResumesBoxHeaderTop>
                  <div></div>
                  <StyledResumesBoxImgWrap>
                    <StyledResumesBoxImg
                      src="/images/profile.png"
                      alt="Profile"
                    />
                  </StyledResumesBoxImgWrap>
                  <StyledResumesBoxHeaderRight>
                    <div>버튼</div>
                    <div>조회수</div>
                  </StyledResumesBoxHeaderRight>
                </StyledResumesBoxHeaderTop>
                <StyledResumesBoxName>홍길동</StyledResumesBoxName>
                <StyledResumesBoxWish>IT 개발자</StyledResumesBoxWish>
                <StyledResumesBoxDcp>
                  안녕하세요. 홍길동입니다. 잘 부탁드립니다.
                </StyledResumesBoxDcp>
              </StyledResumesBoxHeader>
              <StyledResumesBoxContent>
                <StyledResumesBoxContentTitle>
                  경력사항
                </StyledResumesBoxContentTitle>
                <StyledResumesBoxContentLine>
                  <StyledResumesBoxContentPeriod>
                    <StyledpretenderedRegular24>
                      2022.04 ~ 재직 중
                    </StyledpretenderedRegular24>
                    <StyledpretenderedRegulard24>
                      팀장
                    </StyledpretenderedRegulard24>
                  </StyledResumesBoxContentPeriod>
                  <StyledResumesBoxContentinfor>
                    <StyledpretenderedSemiBold24>
                      뫄뫄IT 기업
                    </StyledpretenderedSemiBold24>
                    <StyledpretenderedMedium24>
                      개발팀 리드로 버그 수정 및 팀원 관리, 유관부서와
                      커뮤니케이션 조절, 개발 스터디 운영, 버그해결사 커뮤니티
                      운영 등
                    </StyledpretenderedMedium24>
                  </StyledResumesBoxContentinfor>
                </StyledResumesBoxContentLine>
                <StyledResumesBoxContentTitle>
                  그 외
                </StyledResumesBoxContentTitle>
                <StyledResumesBoxContentLine>
                  <div>
                    <SwitchButton />
                    <div>이력서 공개 중</div>
                  </div>
                </StyledResumesBoxContentLine>
              </StyledResumesBoxContent>
            </StyledResumesBoxWrapper>
          </StyledResumesBox>
        </StyledResumesWrapper>
      </StyledResumesContainer>
    </Layout>
  );
};

export default Resumes;

const StyledResumesContainer = tw.div`
  flex justify-center
`;

const StyledResumesWrapper = tw.div`
`;
const StyledPageTitle = tw.div`
  py-8
`;
const StyledPageTitleText = styled.div`
  ${tw`text-[30px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;
const StyledResumesBox = tw.div`
  p-6
  flex flex-col
  bg-white
  rounded-2xl
  mb-16
  border
  border-[#DFE2E6]
`;
const StyledResumesBoxWrapper = tw.div`
  p-2
  
`;
const StyledResumesBoxHeader = tw.div`
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

const StyledResumesBoxName = styled.div`
  ${tw`text-[30px] flex justify-center`}
  font-family: "${pretenderedBold}", sans-serif;
`;

const StyledResumesBoxWish = styled.div`
  ${tw`text-[18px] flex justify-center`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledResumesBoxDcp = styled.div`
  ${tw`text-[22px] flex justify-center`}
  font-family: "${pretenderedMedium}", sans-serif;
`;

const StyledResumesBoxContentTitle = styled.div`
  ${tw`text-[26px]
  `}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledResumesBoxContentPeriod = tw.div`
w-1/3
`;

const StyledpretenderedRegular24 = styled.div`
  ${tw` text-[24px]`}
  font-family: "${pretenderedRegular}", sans-serif;
`;

const StyledResumesBoxContentinfor = tw.div`
w-2/3
`;
const StyledpretenderedMedium24 = styled.div`
  ${tw`text-[24px]`}
  font-family: "${pretenderedMedium}", sans-serif;
`;

const StyledpretenderedSemiBold24 = styled.div`
  ${tw`text-[26px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledpretenderedRegulard24 = styled.div`
  ${tw`text-[26px]`}
  font-family: "${pretenderedRegular}", sans-serif;
`;

const StyledResumesBoxContentLine = tw.div`
border-t-2
border-t-gray-300
border-opacity-100
flex space-x-4
`;
