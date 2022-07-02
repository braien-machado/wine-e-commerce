import React from 'react';
import styled from 'styled-components';
import SecondaryButton from '../styles/SecondaryButton';
import ArrowIcon from './ArrowIcon';

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  handleClick: (page: number, itemsPerPage: number) => Promise<void>
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

interface ContainerProps {
  page: number;
}

const Container = styled.div<ContainerProps>`
  align-items: center;
  color: #C81A78;
  display: none;
  gap: 8px;
  margin-top: 26.64px;
  
  span {
    font-size: 16px;
    line-height: 9px;
  }

  .page-button:nth-of-type(${(props) => (props.page === 1 ? 2 : 3)}) {
    width: 73px;
  }

  @media screen and (min-width: 1024px) {
    display: flex;
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
  const { page, totalPages, handleClick } = props;

  const PAGES_BUTTONS_NUMBER = 2;

  const previousButton = () => {
    if (page > 1) {
      return (
        <Button
          type="button"
          key="previous-page-btn"
          onClick={() => handleClick(page - 1, 9)}
        >
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
        <Button
          type="button"
          key="next-page-btn"
          onClick={() => handleClick(page + 1, 9)}
        >
          Próximo
          <ArrowIcon flip={undefined} />
        </Button>
      );
    }

    return null;
  };

  const pagesAfterSign = () => {
    if (page <= totalPages - PAGES_BUTTONS_NUMBER) {
      return (<span key="pages-after">...</span>);
    }

    return null;
  };

  const pages = () => {
    const buttons: JSX.Element[] = [];
    const isFirstPage = page === 1;
    const isLastPage = page === totalPages;

    if (totalPages === 1) {
      return buttons;
    }

    let startPage = 1;
    let endPage = totalPages;

    if (isFirstPage && totalPages > 3) {
      endPage = startPage + 2;
    } else if (isLastPage && totalPages > 3) {
      startPage = endPage - 2;
    } else if (totalPages > 3) {
      startPage = page - 1;
      endPage = page + 1;
    }

    for (let i = startPage; i <= endPage; i += 1) {
      if (i === page) {
        buttons.push(
          <PageButton
            className="page-button"
            current
            key={`${i}-${totalPages}`}
          >
            {i}
          </PageButton>,
        );
      } else {
        buttons.push(
          <PageButton
            className="page-button"
            key={`${i}-${totalPages}`}
            onClick={() => handleClick(i, 9)}
          >
            {i}
          </PageButton>,
        );
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
    <Container page={page}>
      { generateButtons() }
    </Container>
  );
}
