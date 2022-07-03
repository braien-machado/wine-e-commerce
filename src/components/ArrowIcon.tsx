import React from 'react';
import styled from 'styled-components';

interface IconProps {
  flip: boolean | undefined;
}

const Svg = styled.svg<IconProps>`
  ${(props) => (!props.flip ? '' : `
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  `)}
`;

function ArrowIcon(props: IconProps) {
  const { flip } = props;

  return (
    <Svg
      flip={!flip ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      fill="none"
      viewBox="0 0 12 10"
    >
      <path
        fill="#B6116E"
        fillRule="evenodd"
        d="M0 9.656c0-.095.04-.19.118-.258L5.134 5 .118.602a.34.34 0 01-.03-.486.348.348 0 01.49-.03l5.31 4.656a.353.353 0 010 .515L.579 9.913A.348.348 0 010 9.656"
        clipRule="evenodd"
      />
      <path
        fill="#B6116E"
        fillRule="evenodd"
        d="M6 9.656c0-.095.04-.19.118-.258L11.134 5 6.118.602a.34.34 0 01-.03-.486.348.348 0 01.49-.03l5.31 4.656a.353.353 0 010 .515l-5.31 4.656A.348.348 0 016 9.656"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default ArrowIcon;
