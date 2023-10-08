import { ResumeFormCareer } from '@/types/resumeForm';
import tw from 'twin.macro';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';

const CareeListModalBox = tw.div`
  fixed top-0 left-0 
  w-full h-full 
  bg-black bg-opacity-40 
  flex justify-center items-center
  overflow-auto
  z-50
`;

const CareeCard = tw.div`
  w-9/12 h-3/4
  max-w-5xl min-h-[400px] min-w-[350px]  bg-white
  mx-10 my-32 p-16 rounded-xl
  overflow-scroll 
`;

const CareeCardHeader = tw.div`
  mb-16 font-semibold text-[30px] text-center
`;

const CareeCardBody = tw.div``;
const CareeCardItem = tw.div``;
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

const EmployedInputWrap = tw.div`
  ml-5
`;
const EmployedLabel = tw.label`
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

interface CareeListModalProps {
  onClose: () => void;
  handleCareerListData: (data: any) => void;
  // 다른 속성 정의
}

interface Option {
  label: number;
  value: number;
}

const CareeListModal: React.FC<CareeListModalProps> = ({
  onClose,
  handleCareerListData,
}) => {
  const [inputs, setInputs] = useState<ResumeFormCareer>({
    startedAt: null,
    endedAt: null,
    company: '',
    title: '',
    isAttendanced: false,
    content: '',
  });
  const [startYear, setStartYear] = useState<number>(0);
  const [endYear, setEndYear] = useState<number>(0);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let year = currentYear; year >= 1960; year--) {
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
    const startYearValue = startYear;
    const nextInputs = {
      ...inputs,
      startedAt: startYearValue,
    };
    setInputs(nextInputs);
  }, [startYear]);

  useEffect(() => {
    const endYearValue = endYear;
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
    handleCareerListData(inputs);
  };

  console.log('inputs' + JSON.stringify(inputs));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <CareeListModalBox onClick={onClose}>
      <CareeCard onClick={e => e.stopPropagation()}>
        <CareeCardHeader>경력 등록하기</CareeCardHeader>
        <CareeCardBody>
          <CareeCardItem>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>회사명</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <InputContnet
                type="text"
                maxLength={20}
                placeholder="회사명을 입력해 주세요."
                name="company"
                value={inputs.company}
                onChange={onChange}
              />
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>최종 직함</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <InputContnet
                type="text"
                maxLength={20}
                placeholder="최종 직함을 입력해 주세요. (예: 부장 등)"
                name="title"
                value={inputs.title}
                onChange={onChange}
              />
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>재직 기간</InputLabel>
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
                <EmployedInputWrap>
                  <EmployedLabel>
                    <input
                      type="checkbox"
                      checked={inputs.isAttendanced}
                      onChange={() =>
                        setInputs({
                          ...inputs,
                          endedAt: null,
                          isAttendanced: !inputs.isAttendanced,
                        })
                      }
                      tw="mr-1"
                    />
                    재직중
                  </EmployedLabel>
                </EmployedInputWrap>
              </Wapper>
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>간단 내용</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <TextareaContent
                maxLength={20}
                placeholder="예)&#13;&#10;담당 업무 : 해외 영업&#13;&#10;주요 경험 및 역량 : 일본 DOCOMO 12억원 계약 체결"
                name="content"
                value={inputs.content}
                onChange={onChange}
              />
            </InputWrap>
          </CareeCardItem>
        </CareeCardBody>
        <BtnWapper onClick={submitData}>입력 완료</BtnWapper>
      </CareeCard>
    </CareeListModalBox>
  );
};

export default CareeListModal;
