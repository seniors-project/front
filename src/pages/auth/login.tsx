import { kakaoLogin } from '@/utils/kakaoLogin';

import { Layout } from '@/components/Layout';

export default function Login() {
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
