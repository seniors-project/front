import tw from 'twin.macro';
import styled from '@emotion/styled';

import { Layout } from '@/components/Layout';

import { pretenderedSemiBold } from '@/styles/fonts';

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
                  <StyledResumesBoxImg>사진</StyledResumesBoxImg>
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
              <StyledResumesBoxContent>경력사항</StyledResumesBoxContent>
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

const StyledResumesBoxImg = tw.div`
border-2
  border-black
`;

const StyledResumesBoxContent = tw.div`
border-2
  border-black
`;

const StyledResumesBoxHeaderTop = tw.div`
border-2
  border-black 
 flex flex-row justify-between
`;

const StyledResumesBoxHeaderRight = tw.div`
border-2
  border-black
`;

const StyledResumesBoxName = tw.div`
border-2
  border-black
  flex justify-center
`;

const StyledResumesBoxWish = tw.div`
border-2
  border-black
  flex justify-center
`;

const StyledResumesBoxDcp = tw.div`
border-2
  border-black
  flex justify-center
`;

// const StyledPageTitle = tw.div`
// border-2
//   border-black
// `;
