import tw from 'twin.macro';
import Link from 'next/link';
import Image from 'next/image';

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
  w-28
`;

const Menu = tw.ul`block text-lg font-semibold`;
const MenuItem = tw.li`inline-block p-0 pl-6`;

const ResumeCardHeaderProfileImg = tw.div`
  w-11 h-11 mr-2
  rounded-full
  overflow-hidden
`;

interface Props {
  token: string;
  profileImg: string;
}

export function Header({ token, profileImg }: Props) {
  return (
    <StyledHeader>
      <Container>
        <ContainerInner>
          <Logo>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Logo picture"
                width={300}
                height={100}
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
            {token ? (
              <MenuItem>
                <ResumeCardHeaderProfileImg>
                  {profileImg ? (
                    <Image
                      src={profileImg}
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
