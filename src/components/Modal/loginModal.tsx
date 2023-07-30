import tw from 'twin.macro';

function LoginModal() {
  return (
    <StyledLoginContainer>
      <>
        시니어스 회원으로 <br /> 더 많은 정보를 누리세요!
      </>
      <>시니어스 회원이 되면 모든 컨텐츠를 이용 할 수 있어요.</>
      <>
        <img src="/images/kakao.png" />
      </>
    </StyledLoginContainer>
  );
}

export default LoginModal;

const StyledLoginContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
  h-full
`;
