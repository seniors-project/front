export function kakaoLogin() {
  window.Kakao.Auth.authorize({
    redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  });
}
