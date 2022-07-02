import React from 'react';
import styled from 'styled-components';
import SecondaryButton from '../styles/SecondaryButton';
import ArrowIcon from './ArrowIcon';

interface PaginationButtonsProps {
  page: number;
  totalPages: number
}

interface PageButtonProps {
  current?: boolean
}

const PageButton = styled(SecondaryButton)<PageButtonProps>`
  background-color: ${(props) => (!props.current ? 'inherit' : '#C81A78')};
  color: ${(props) => (!props.current ? '#C81A78' : 'white')};
  height: 38px;
  pointer-events: ${(props) => (!props.current ? 'inherit' : 'none')};
  width: 38px;
`;

const Container = styled.div`
  align-items: center;
  color: #C81A78;
  display: flex;
  font-size: 16px;
  gap: 8px;
  line-height: 9px;
  margin-top: 26.64px;
`;

const Button = styled.button`
  align-items: center;
  border: none;
  color: #C81A78;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  gap: 3px;
  line-height: 14.4px;
`;

export default function PaginationButtons(props: PaginationButtonsProps) {
  const { page, totalPages } = props;

  const generateButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i += 1) {
      if (i === page) {
        buttons.push(<PageButton current key={i}>{i}</PageButton>);
      } else {
        buttons.push(<PageButton key={i}>{i}</PageButton>);
      }
    }

    return buttons;
  };

  return (
    <Container>
      <Button type="button">
        <ArrowIcon flip />
        Anterior
      </Button>
      { generateButtons() }
      ...
      <Button type="button">
        Próximo
        <ArrowIcon flip={undefined} />
      </Button>
    </Container>
  );
}
