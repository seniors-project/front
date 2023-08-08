import tw from 'twin.macro';
import Link from 'next/link';

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

export function Header() {
  return (
    <StyledHeader>
      <Container>
        <ContainerInner>
          <Logo>
            <Link href="/">
              <img src="/images/logo.png" />
            </Link>
          </Logo>
          <Menu>
            <Link href="/resumes">
              <MenuItem>공개 이력서</MenuItem>
            </Link>
            <MenuItem>
              <Link href="/chat">채팅하기</Link>
            </MenuItem>
            <MenuItem>알림</MenuItem>
            <MenuItem>
              <Link href="/auth/login">
                <MenuItem>로그인/회원가입</MenuItem>
              </Link>
            </MenuItem>
          </Menu>
        </ContainerInner>
      </Container>
    </StyledHeader>
  );
}
