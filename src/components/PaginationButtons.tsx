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
  font-size: 16px;
  height: 38px;
  pointer-events: ${(props) => (!props.current ? 'inherit' : 'none')};
  width: 38px;
`;

const Container = styled.div`
  align-items: center;
  color: #C81A78;
  display: flex;
  gap: 8px;
  margin-top: 26.64px;
  
  span {
    font-size: 16px;
    line-height: 9px;
  }

  .page-button:nth-of-type(2) {
    width: 73px;
  }
`;

const Button = styled.button`
  align-items: center;
  background-color: inherit;
  border: none;
  color: #C81A78;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  gap: 3px;
  line-height: 14.4px;
  transition-duration: 150ms;

  &:hover {
    text-decoration: underline;
  }
`;

export default function PaginationButtons(props: PaginationButtonsProps) {
  const { page, totalPages } = props;

  const PAGES_BUTTONS_NUMBER = 3;

  const previousButton = () => {
    if (page > 1) {
      return (
        <Button type="button" key="previous-page-btn">
          <ArrowIcon flip />
          Anterior
        </Button>
      );
    }

    return null;
  };

  const pagesBeforeSign = () => {
    if (page > PAGES_BUTTONS_NUMBER) {
      return (<span key="pages-before">...</span>);
    }

    return null;
  };

  const nextButton = () => {
    if (page !== totalPages) {
      return (
        <Button type="button" key="next-page-btn">
          Próximo
          <ArrowIcon flip={undefined} />
        </Button>
      );
    }

    return null;
  };

  const pagesAfterSign = () => {
    if (page < totalPages - 3) {
      return (<span key="pages-after">...</span>);
    }

    return null;
  };

  const pages = () => {
    const buttons = [];
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    let startPage = 1;
    let endPage = totalPages;

    if (isFirstPage) {
      endPage = startPage + 2;
    } else if (isLastPage) {
      startPage = endPage - 2;
    } else {
      startPage = page - 1;
      endPage = page + 1;
    }

    for (let i = startPage; i <= endPage; i += 1) {
      if (i === page) {
        buttons.push(<PageButton className="page-button" current key={`${i}-${totalPages}`}>{i}</PageButton>);
      } else {
        buttons.push(<PageButton className="page-button" key={`${i}-${totalPages}`}>{i}</PageButton>);
      }
    }

    return buttons;
  };

  const generateButtons = () => ([
    previousButton(),
    pagesBeforeSign(),
    ...pages(),
    pagesAfterSign(),
    nextButton(),
  ]);

  return (
    <Container>
      { generateButtons() }
    </Container>
  );
}
