import tw from 'twin.macro';
import styled from '@emotion/styled';

import {
  pretenderedSemiBold,
  pretenderedMedium,
  pretenderedRegular,
} from '@/styles/fonts';
import { ResumesInforBoxProps } from '@/types/resume';

const ResumesInforBox = ({
  title,
  period,
  subPeriod,
  content,
  subContent,
}: ResumesInforBoxProps) => {
  return (
    <div>
      <StyledResumesBoxContentTitle>{title}</StyledResumesBoxContentTitle>
      <StyledResumesBoxContentLine>
        <div css={tw`flex mt-2`}>
          <StyledResumesBoxContentPeriod>
            <StyledpretenderedRegular24>
              2022.04 ~ 재직 중{period}
            </StyledpretenderedRegular24>
            <StyledpretenderedRegulard24 css={tw`mt-3`}>
              팀장{subPeriod}
            </StyledpretenderedRegulard24>
          </StyledResumesBoxContentPeriod>
          <StyledResumesBoxContentinfor>
            <StyledpretenderedSemiBold24>
              뫄뫄IT 기업{content}
            </StyledpretenderedSemiBold24>
            <StyledpretenderedMedium24 css={tw`mt-3`}>
              개발팀 리드로 버그 수정 및 팀원 관리, 유관부서와 커뮤니케이션
              조절, 개발 스터디 운영, 버그해결사 커뮤니티 운영 등{subContent}
            </StyledpretenderedMedium24>
          </StyledResumesBoxContentinfor>
        </div>
      </StyledResumesBoxContentLine>
    </div>
  );
};

export default ResumesInforBox;

const StyledResumesBoxContentTitle = styled.div`
  ${tw`text-[26px] mt-12 mb-3
  `}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledResumesBoxContentLine = tw.div`
border-t-2
border-t-gray-300
border-opacity-100
 space-x-4
`;

const StyledResumesBoxContentPeriod = tw.div`
w-1/3
`;

const StyledpretenderedRegular24 = styled.div`
  ${tw` text-[24px] text-[#515A64]`}
  font-family: "${pretenderedRegular}", sans-serif;
`;

const StyledResumesBoxContentinfor = tw.div`
w-2/3
`;

const StyledpretenderedSemiBold24 = styled.div`
  ${tw`text-[26px]`}
  font-family: "${pretenderedSemiBold}", sans-serif;
`;

const StyledpretenderedMedium24 = styled.div`
  ${tw`text-[24px] text-[#515A64]`}
  font-family: "${pretenderedMedium}", sans-serif;
`;

const StyledpretenderedRegulard24 = styled.div`
  ${tw`text-[26px] text-[#515A64]`}
  font-family: "${pretenderedRegular}", sans-serif;
`;
