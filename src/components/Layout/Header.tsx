import tw from 'twin.macro';

import { Container } from '@/styles';

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
            <img src="/images/logo.png" />
          </Logo>
          <Menu>
            <MenuItem>공개 이력서</MenuItem>
            <MenuItem>채팅하기</MenuItem>
            <MenuItem>알림</MenuItem>
            <MenuItem>로그인/회원가입</MenuItem>
          </Menu>
        </ContainerInner>
      </Container>
    </StyledHeader>
  );
}
