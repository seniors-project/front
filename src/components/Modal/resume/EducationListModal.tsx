import { ResumeFormEducation } from '@/types/resumeForm';
import tw from 'twin.macro';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';

const EducationListModalBox = tw.div`
  fixed top-0 left-0 
  w-full h-full 
  bg-black bg-opacity-40 
  flex justify-center items-center
  overflow-auto
  text-black z-50
`;

const EducationCard = tw.div`
  w-9/12 h-3/4
  max-w-5xl min-h-[400px] min-w-[350px]  bg-white
  mx-10 my-32 p-16 rounded-xl
  overflow-scroll 
`;

const EducationCardHeader = tw.div`
  mb-16 font-semibold text-[30px] text-center
`;

const EducationCardBody = tw.div``;
const EducationCardItem = tw.div``;
const InputWrap = tw.div` mb-8`;
const InputLabelWrap = tw.div`mb-3`;
const InputLabel = tw.span`
  text-[26px] font-semibold
`;
const ContentStyles = `
  focus:outline-none rounded-lg
  w-full h-16 border p-2 bg-[#F1F3F5]
  placeholder:text-[#878E95] placeholder:font-medium text-2xl
`;
const InputContnet = tw.input`${ContentStyles}`;
const TextareaContent = tw.textarea`${ContentStyles} h-28`;

const Wapper = tw.div`
  flex items-center h-16
`;

const SelectWrap = tw.div`
  w-48 font-medium text-2xl
`;

const InProgressInputWrap = tw.div`
  ml-5
`;
const InProgressLabel = tw.label`
  text-2xl font-medium
`;

const BtnWapper = tw.div`
  w-40 h-12 flex
  items-center justify-center
  p-2 mx-auto bg-blue-500 rounded
  text-white text-xl font-semibold
`;

interface ChangeEvent {
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
}

interface EducationListModalProps {
  onClose: () => void;
  handleEducationListData: (data: any) => void;
  // 다른 속성 정의
}

interface Option {
  label: number;
  value: number;
}

const EducationListModal: React.FC<EducationListModalProps> = ({
  onClose,
  handleEducationListData,
}) => {
  const [inputs, setInputs] = useState<ResumeFormEducation>({
    institution: '',
    process: '',
    startedAt: null,
    endedAt: null,
    content: '',
    isProcessed: false,
  });
  const [startYear, setStartYear] = useState<number>(0);
  const [endYear, setEndYear] = useState<number>(0);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let year = currentYear; year >= 1960; year--) {
      // options.push({ value: Number(year), label: Number(year) });
      options.push({ value: year, label: year });
    }
    return options;
  };

  const handleStartYearChange = (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) return;
    setStartYear(selectedOption.value);
  };

  const handleEndYearChange = (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) return;
    setEndYear(selectedOption.value);
  };

  useEffect(() => {
    const startYearValue = startYear; //parseInt(startYear, 10);
    const nextInputs = {
      ...inputs,
      startedAt: startYearValue,
    };
    setInputs(nextInputs);
  }, [startYear]);

  useEffect(() => {
    const endYearValue = endYear; //parseInt(endYear.value, 10);
    const nextInputs = {
      ...inputs,
      endedAt: endYearValue,
    };
    setInputs(nextInputs);
  }, [endYear]);

  const onChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    const nextInputs = {
      ...inputs,
      [name]: value,
    };
    setInputs(nextInputs);
  };

  const yearOptions = generateYearOptions();

  const submitData = () => {
    onClose();
    handleEducationListData(inputs);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <EducationListModalBox onClick={onClose}>
      <EducationCard onClick={e => e.stopPropagation()}>
        <EducationCardHeader>교육 등록하기</EducationCardHeader>
        <EducationCardBody>
          <EducationCardItem>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>학교/교육기관</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <InputContnet
                type="text"
                maxLength={20}
                placeholder="교육 받으신 기관/학교 명을 입력해 주세요."
                name="institution"
                value={inputs.institution}
                onChange={onChange}
              />
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>전공/과정</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <InputContnet
                type="text"
                maxLength={20}
                placeholder="교육 받으신 기관/학교의 전공 혹은 과정을 입력해 주세요."
                name="process"
                value={inputs.process}
                onChange={onChange}
              />
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>교육 기간</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <Wapper>
                <SelectWrap>
                  <Select
                    options={yearOptions}
                    value={{ label: startYear, value: startYear }}
                    onChange={handleStartYearChange}
                    placeholder="입사연도"
                  />
                </SelectWrap>
                <div tw="font-medium text-2xl mx-3">~</div>
                <SelectWrap>
                  <Select
                    options={yearOptions}
                    value={{ label: endYear, value: endYear }}
                    onChange={handleEndYearChange}
                    placeholder="퇴사연도"
                  />
                </SelectWrap>
                <InProgressInputWrap>
                  <InProgressLabel>
                    <input
                      type="checkbox"
                      checked={inputs.isProcessed}
                      onChange={() =>
                        setInputs({
                          ...inputs,
                          endedAt: null,
                          isProcessed: !inputs.isProcessed,
                        })
                      }
                      tw="mr-1"
                    />
                    진행중
                  </InProgressLabel>
                </InProgressInputWrap>
              </Wapper>
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>전공/과정</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <TextareaContent
                maxLength={20}
                placeholder="이수한 교육에 대해 입력해 주세요.&#13;&#10;예)&#13;&#10;IT 취업 아카데미에서 중장년 개발자 프로그램 1기 수료, 웹페이지 구축 중"
                name="content"
                value={inputs.content}
                onChange={onChange}
              />
            </InputWrap>
          </EducationCardItem>
        </EducationCardBody>
        <BtnWapper onClick={submitData}>입력 완료</BtnWapper>
      </EducationCard>
    </EducationListModalBox>
  );
};

export default EducationListModal;
