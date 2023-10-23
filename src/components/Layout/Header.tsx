import { useRecoilValue } from 'recoil';
import tw from 'twin.macro';
import Link from 'next/link';
import Image from 'next/image';

import { userState } from '@/atom/user';

const Container = tw.div`
  max-w-7xl mx-auto py-4 px-6
`;

const StyledHeader = tw.header`
  bg-white border-b-2
`;

const ContainerInner = tw.div`
  flex justify-between items-center
`;

const Logo = tw.div`
  w-28 ml-10
`;

const Menu = tw.ul`
  flex text-lg font-semibold
`;
const MenuItem = tw.li`
  p-0 ml-10 my-auto
`;

const ResumeCardHeaderProfileImg = tw.div`
  w-11 h-11 mr-2
  rounded-full overflow-hidden
`;

export function Header() {
  const user = useRecoilValue(userState);
  return (
    <StyledHeader>
      <Container>
        <ContainerInner>
          <Logo>
            <Link href="/">
              <Image
                src="/images/main_logo.png"
                alt="Logo picture"
                width={50}
                height={50}
              />
            </Link>
          </Logo>
          <Menu>
            <MenuItem>
              <Link href="/resumes">공개 이력서</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/chat">채팅하기</Link>
            </MenuItem>
            <MenuItem>알림</MenuItem>
            {user != null ? (
              <MenuItem>
                <ResumeCardHeaderProfileImg>
                  {user.profileImageUrl ? (
                    <Image
                      src={user.profileImageUrl}
                      alt="profile img"
                      width={500}
                      height={100}
                    />
                  ) : (
                    <Image
                      src="/images/basicProfile.png"
                      alt="profile img"
                      width={500}
                      height={100}
                    />
                  )}
                </ResumeCardHeaderProfileImg>
              </MenuItem>
            ) : (
              <MenuItem>
                <Link href="/auth/login">로그인/회원가입</Link>
              </MenuItem>
            )}
          </Menu>
        </ContainerInner>
      </Container>
    </StyledHeader>
  );
}
