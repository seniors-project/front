import { ResumeFormCertificate } from '@/types/resumeForm';
import tw from 'twin.macro';
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';

const CertificateListModalBox = tw.div`
  fixed top-0 left-0 
  w-full h-full 
  bg-black bg-opacity-40 
  flex justify-center items-center
  overflow-auto
  text-black z-50
`;

const CertificateCard = tw.div`
  w-9/12 h-3/4
  max-w-5xl min-h-[400px] min-w-[350px]  bg-white
  mx-10 my-32 p-16 rounded-xl
  overflow-scroll 
`;

const CertificateCardHeader = tw.div`
  mb-16 font-semibold text-[30px] text-center
`;

const CertificateCardBody = tw.div``;
const CertificateCardItem = tw.div``;
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

interface CertificateListModalProps {
  onClose: () => void;
  handleCertificateListData: (data: any) => void;
  // 다른 속성 정의
}

interface Option {
  label: number | null;
  value: number | null;
}

const CertificateListModal: React.FC<CertificateListModalProps> = ({
  onClose,
  handleCertificateListData,
}) => {
  const [inputs, setInputs] = useState<ResumeFormCertificate>({
    name: '',
    rating: '',
    issuedYear: null,
    issuedMonth: null,
    isIssued: false,
  });
  const [issuedYear, setIssuedYear] = useState<number | null>(null);
  const [issuedMonth, setIssuedMonth] = useState<number | null>(null);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let year = currentYear; year >= 1960; year--) {
      options.push({ value: year, label: year });
    }
    return options;
  };

  const months = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleIssuedYearChange = (selectedOption: SingleValue<Option>) => {
    if (!selectedOption) return;
    setIssuedYear(selectedOption.value);
  };

  const handleIssuedMonthChange = (selectedOption: Option | null) => {
    if (!selectedOption) return;
    setIssuedMonth(selectedOption.value);
  };

  useEffect(() => {
    const issuedYearValue = issuedYear;
    const nextInputs = {
      ...inputs,
      issuedYear: issuedYearValue,
    };
    setInputs(nextInputs);
  }, [issuedYear]);

  useEffect(() => {
    const issuedMonthValue = issuedMonth;
    const nextInputs = {
      ...inputs,
      issuedMonth: issuedMonthValue,
    };
    setInputs(nextInputs);
  }, [issuedMonth]);

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
    handleCertificateListData(inputs);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <CertificateListModalBox onClick={onClose}>
      <CertificateCard onClick={e => e.stopPropagation()}>
        <CertificateCardHeader>자격증 등록하기</CertificateCardHeader>
        <CertificateCardBody>
          <CertificateCardItem>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>자격증 명</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <InputContnet
                type="text"
                maxLength={20}
                placeholder="취득한 자격증을 입력해 주세요."
                name="name"
                value={inputs.name}
                onChange={onChange}
              />
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>점수/등급</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <InputContnet
                type="text"
                maxLength={20}
                placeholder="취득한 자격증의 점수 혹은 등급을 입력해 주세요."
                name="rating"
                value={inputs.rating}
                onChange={onChange}
              />
            </InputWrap>
            <InputWrap>
              <InputLabelWrap>
                <InputLabel>발행 일자</InputLabel>
                <span tw="text-[#E15241]"> *</span>
              </InputLabelWrap>
              <Wapper>
                <SelectWrap>
                  <Select
                    options={yearOptions}
                    value={
                      issuedYear
                        ? { label: issuedYear, value: issuedYear }
                        : null
                    }
                    onChange={handleIssuedYearChange}
                    placeholder="발행 연도"
                    isDisabled={inputs.isIssued}
                  />
                </SelectWrap>
                <div tw="font-medium text-2xl mx-3">~</div>
                <SelectWrap>
                  <Select
                    options={months}
                    value={
                      issuedMonth
                        ? { label: issuedMonth, value: issuedMonth }
                        : null
                    }
                    onChange={handleIssuedMonthChange}
                    placeholder="월"
                    isDisabled={inputs.isIssued}
                  />
                </SelectWrap>
                <InProgressInputWrap>
                  <InProgressLabel>
                    <input
                      type="checkbox"
                      checked={inputs.isIssued}
                      onChange={() =>
                        setInputs({
                          ...inputs,
                          issuedMonth: null,
                          isIssued: !inputs.isIssued,
                        })
                      }
                      tw="mr-1"
                    />
                    발행 예정
                  </InProgressLabel>
                </InProgressInputWrap>
              </Wapper>
            </InputWrap>
          </CertificateCardItem>
        </CertificateCardBody>
        <BtnWapper onClick={submitData}>입력 완료</BtnWapper>
      </CertificateCard>
    </CertificateListModalBox>
  );
};

export default CertificateListModal;
