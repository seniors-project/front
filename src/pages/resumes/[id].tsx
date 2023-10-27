import tw from 'twin.macro';
import styled from '@emotion/styled';

import { Layout } from '@/components/Layout';

import {
  pretenderedSemiBold,
  pretenderedBold,
  pretenderedMedium,
  pretenderedRegular,
} from '@/styles/fonts';

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
border-2
  border-black
  flex justify-center
`;

const StyledResumesWrapper = tw.div`
border-2
  border-black
`;
const StyledPageTitle = tw.div`
  border-2
  border-black
  py-8
`;
const StyledPageTitleText = styled.div`
  ${tw`border-2 border-black text-[30px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;
const StyledResumesBox = tw.div`
border-2
  border-black
  p-6
  flex flex-col
  bg-white
`;
const StyledResumesBoxWrapper = tw.div`
border-2
  border-black
  p-2
  
`;
const StyledResumesBoxHeader = tw.div`
border-2
  border-black
  `;

const StyledResumesBoxImgWrap = tw.div`
border-2
  border-black
  grid justify-items-center
`;
const StyledResumesBoxImg = tw.img`
w-[120px] h-[120px] rounded-full
`;

const StyledResumesBoxContent = tw.div`
border-2
  border-black
`;

const StyledResumesBoxHeaderTop = tw.div`
border-2
  border-black 
  grid grid-cols-3 grid-flow-col
`;

const StyledResumesBoxHeaderRight = tw.div`
border-2
  border-black
  grid justify-items-end
`;

const StyledResumesBoxName = styled.div`
  ${tw`border-2 border-black text-[30px] flex justify-center`}
  font-family: "${pretenderedBold}", sans-serif;
`;

const StyledResumesBoxWish = styled.div`
  ${tw`border-2 border-black text-[18px] flex justify-center`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledResumesBoxDcp = styled.div`
  ${tw`border-2 border-black text-[22px] flex justify-center`}
  font-family: "${pretenderedMedium}", sans-serif;
`;

const StyledResumesBoxContentTitle = styled.div`
  ${tw`text-[26px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledResumesBoxContentPeriod = styled.div``;
const StyledpretenderedRegular24 = styled.div`
  ${tw` text-[24px]`}
  font-family: "${pretenderedRegular}", sans-serif;
`;

const StyledResumesBoxContentinfor = styled.div`
border-2
border-black
`;
const StyledpretenderedMedium24 = styled.div`
  ${tw`border-2 border-black text-[24px]`}
  font-family: "${pretenderedMedium}", sans-serif;
`;

const StyledpretenderedSemiBold24 = styled.div`
  ${tw`border-2 border-black text-[26px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledpretenderedRegulard24 = styled.div`
  ${tw`border-2 border-black text-[26px]`}
  font-family: "${pretenderedRegular}", sans-serif;
`;

const StyledResumesBoxContentLine = tw.div`
border-t-2
border-t-gray-300
border-opacity-100
flex space-x-4
`;
const StyledPageTitle1 = tw.div`
border-2
  border-black
  w-1/3
     `;
const StyledPageTitle2 = tw.div`
border-2
  border-black
  w-2/3
    `;
