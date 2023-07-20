import { Layout } from '@/components/Layout';

export default function Login() {
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:3000/auth/kakao/callback',
    });
  }

  return (
    <Layout>
      <div>
        <button title="카카오 로그인" onClick={kakaoLogin}>
          이미지 대체예정
        </button>
      </div>
    </Layout>
  );
}
