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
    min-width: 400px;
  }

  ol, ul {
  list-style: none;
  margin:0px; padding:0px;
  }
 
`;

export default GlobalStyled;

// AppWrapper
export const AppWrapper = styled.div`
  &,
  & * {
    box-sizing: border-box;
  }
`;

// 확대 했을때 무한대로 늘어나는거 방지
// ============================ Container ============================
export const MaxWidthContainer = styled.div`
  max-width: 1400px;
  margin: auto;
`;
// ============================ Loding ============================
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
  background-size: 200px;
`;

// ============================ Row or Col ============================
const StyledRow = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Row = (props) => {
  return <StyledRow>{props.children}</StyledRow>;
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

// ============================ Header ============================
export const FlexBox = styled.div`
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


  .flex--item {
    text-align: center;
    width: 100%;
    margin: 50px;
    .flex--item-w50 {
      box-sizing: border-box;
      width: 50%;
      padding: 0 20px;
      display: inline-block;
    }
  }

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
    .flex--item > .flex--item-w50 {
      width: 100%;
      padding: 0;
      margin-top: 100px;
    }
  }
`;

FlexBox.defaultProps = {
  position: "sb",
};

// ============================ Main ============================
export const Title = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 2rem;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 1.5rem;
  }
`;

// ============================ Death chart ============================
export const LineSvg = styled.svg`
  overflow: unset;
  border-top: 1px solid;
  border-left: 1px solid;
  border: 1px solid;

  ${({ h }) =>
    h &&
    css`
      height: ${h}px;
    `}

  .point {
    cursor: pointer;
  }

  line {
    color: rgba(189, 195, 199, 0.5);
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    text {
      font-size: 0.8rem;
    }
  }
`;

// ============================ Home ============================
