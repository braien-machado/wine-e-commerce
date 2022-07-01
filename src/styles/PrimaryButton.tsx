import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: #7EBC43;
  border-radius: 4px;
  border: 2px solid #7EBC43;
  color: white;
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  padding: 12px 0;
  transition-duration: 150ms;
  width: 100%;

  &:hover {
    background-color: #6aa038;
    border-color: #6aa038;
  }
`;

export default PrimaryButton;
