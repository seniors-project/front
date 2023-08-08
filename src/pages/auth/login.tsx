import tw from 'twin.macro';
import Link from 'next/link';
import Image from 'next/image';

import { kakaoLogin } from '@/utils/kakaoLogin';

import { Layout } from '@/components/Layout';
import { Container } from '@/styles';

const Logo = tw.div`
  w-28 mt-10 mx-auto
`;

const LoginHeader = tw.div`
  mt-10 font-semibold text-3xl
`;

const LoginDescription = tw.div`
  mt-6
`;

const BtnWapper = tw.button`
 mt-7 mx-auto
`;

export default function Login() {
  return (
    <Layout>
      <Container>
        <Logo>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="logo picture"
              width={311}
              height={76}
            />
          </Link>
        </Logo>
        <div tw="max-w-lg mx-auto">
          <LoginHeader>
            <h1>회원가입</h1>
          </LoginHeader>
          <LoginDescription>
            <p>
              아이디, 비밀번호, 휴대폰번호 입력하기 귀찮으시죠? <br />
              카카오로 1초만에 로그인 하세요!
            </p>
          </LoginDescription>
          <BtnWapper title="카카오 로그인" onClick={kakaoLogin}>
            <Image
              src="/images/kakao.png"
              alt="kakao login picture"
              width={200}
              height={80}
            />
          </BtnWapper>
        </div>
      </Container>
    </Layout>
  );
}
