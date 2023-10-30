import React, { useState } from 'react';
import styled from '@emotion/styled';

const SwitchButton = () => {
  const [isToggled, setToggled] = useState<boolean>(false);

  const toggleSwitch = () => {
    setToggled(!isToggled);
  };

  return (
    <SwitchButtonContainer onClick={toggleSwitch} isToggled={isToggled}>
      <SwitchCircle isToggled={isToggled} />
    </SwitchButtonContainer>
  );
};

const SwitchButtonContainer = styled.div<{ isToggled: boolean }>`
  width: 50px;
  height: 24px;
  background-color: ${props => (props.isToggled ? '#0177FD' : '#ccc')};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
`;

const SwitchCircle = styled.div<{ isToggled: boolean }>`
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: ${props => (props.isToggled ? '26px' : '2px')};
  transition: left 0.2s;
`;

export default SwitchButton;
