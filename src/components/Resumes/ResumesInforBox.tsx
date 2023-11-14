import tw from 'twin.macro';

import { ResumesInforBoxProps } from '@/types/resume';

const StyledResumesBoxContentTitle = tw.div`
  text-[26px] mt-12 mb-3 font-semibold
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

const StyledpretenderedRegular24 = tw.div`
  text-[24px] text-[#515A64] font-regular
`;

const StyledResumesBoxContentinfor = tw.div`
  w-2/3
`;

const StyledpretenderedSemiBold24 = tw.div`
  text-[26px] font-semibold
  `;

const StyledpretenderedMedium24 = tw.div`
  text-[24px] text-[#515A64] font-medium
`;

const StyledpretenderedRegulard24 = tw.div`
  text-[26px] text-[#515A64] font-regular
`;

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
            <StyledpretenderedRegular24>{period}</StyledpretenderedRegular24>
            <StyledpretenderedRegulard24 css={tw`mt-3`}>
              {subPeriod}
            </StyledpretenderedRegulard24>
          </StyledResumesBoxContentPeriod>
          <StyledResumesBoxContentinfor>
            <StyledpretenderedSemiBold24>{content}</StyledpretenderedSemiBold24>
            <StyledpretenderedMedium24 css={tw`mt-3`}>
              {subContent}
            </StyledpretenderedMedium24>
          </StyledResumesBoxContentinfor>
        </div>
      </StyledResumesBoxContentLine>
    </div>
  );
};

export default ResumesInforBox;
