export function kakaoLogin() {
  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/auth/kakao/callback',
  });
}
