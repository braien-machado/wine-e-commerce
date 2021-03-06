import React from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  @media screen and (min-width: 768px) {
    width: 31.6px;
    height: 31.6px;
  }
`;

function SearchIcon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="25"
      fill="none"
      viewBox="0 0 26 25"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M9.807 17.817c-4.754 0-8.623-3.72-8.623-8.292 0-4.572 3.869-8.29 8.623-8.29s8.622 3.718 8.622 8.29c0 4.572-3.868 8.292-8.622 8.292zm15.687 6.138l-8.537-8.21c-.018-.017-.04-.024-.06-.038 1.545-1.637 2.495-3.802 2.495-6.182 0-5.081-4.3-9.216-9.585-9.216C4.521.309.221 4.444.221 9.525c0 5.083 4.3 9.218 9.586 9.218a9.75 9.75 0 006.43-2.401c.013.02.02.04.04.058l8.536 8.21a.49.49 0 00.34.135.489.489 0 00.34-.136.45.45 0 000-.654z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export default SearchIcon;
