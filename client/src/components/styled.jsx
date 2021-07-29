import styled, { createGlobalStyle, css } from "styled-components";
import loding from "images/loding.gif";
const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 992;
const BREAK_POINT_PC = 1200;

const GlobalStyled = createGlobalStyle`
  *{
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }

  body{
    margin: 0; 
  }
  html{
    width: 100vw;
  }

  ol, ul {
  list-style: none;
  margin:0px; padding:0px;
  }
 
`;

export default GlobalStyled;

export const MaxWidthConatiner = styled.div`
  max-width: 1400px;
  margin: auto;
`;

export const ImgLoding = styled.div`
  background: transparent;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-image: url(${loding});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20%;
`;

export const Row = (props) => {
  const Row = styled.div`
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  `;
  return <Row>{props.children}</Row>;
};

const calcWidthPercent = (span) => {
  if (!span) return;

  const width = (span / 12) * 100;
  return width;
};

export const Col = styled.div`
  float: left;
  width: ${({ xs }) => (xs ? `${calcWidthPercent(xs)}%` : `100%`)};
  @media only screen and (min-width: ${BREAK_POINT_MOBILE}px) {
    width: ${({ sm }) => sm && `${calcWidthPercent(sm)}%`};
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: ${({ md }) => md && `${calcWidthPercent(md)}%`};
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px) {
    width: ${({ lg }) => lg && `${calcWidthPercent(lg)}%`};
  }
`;
Col.defaultProps = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
};

// AppWrapper
export const AppWrapper = styled.div`
  &,
  & * {
    box-sizing: border-box;
  }
`;

// Header
export const HeaderContainer = styled.header`
  background-color: #e74c3c;
`;

export const FloxBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  padding: 16px;

  ${({ position }) =>
    position === "c" &&
    css`
      justify-content: center;
    `}

  ${({ position }) =>
    position === "sb" &&
    css`
      justify-content: space-between;
    `}

    @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    & > div {
      justify-content: center;
      width: 100%;
    }

    span {
      font-size: 1rem;
      text-align: center;
    }
    li {
      width: 100%;
    }
  }
`;

FloxBox.defaultProps = {
  position: "sb",
};

//Main
export const MainCatiner = styled.section`
  max-width: 1400px;
  margin: auto;
`;

export const Title = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 2rem;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 1.5rem;
  }
`;
