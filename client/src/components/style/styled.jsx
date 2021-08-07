import styled, { createGlobalStyle, css } from "styled-components";
import loding from "images/loding.gif";
const BREAK_POINT_SMALL_MOBILE = 560;
const BREAK_POINT_MOBILE = 768;
const BREAK_POINT_TABLET = 992;
const BREAK_POINT_PC = 1200;

// 반응형 사이즈
const maxWidthByBreakPointMobile = (props) => css`
  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    ${props}
  }
`;
const maxWidthByBreakPointTable = (props) => css`
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    ${props}
  }
`;

const maxWidthByBreakPointSmallMobile = (props) => css`
  @media only screen and (max-width: ${BREAK_POINT_SMALL_MOBILE}px) {
    ${props}
  }
`;

const GlobalStyled = createGlobalStyle`
  *{
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
  }

  body{
    margin: 0; 
  }
  html{
    min-width: 375px;
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
  position: relative;
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
const HOMECHARTMARGINTOP = 110;

const flex_items_postion = (x, y) => css`
  display: flex;
  justify-content: ${x};
  align-items: ${y};
`;

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


  .flex-item {
    text-align: center;
    width: 100%;

    &:not(:first-child) {
      margin-top: ${HOMECHARTMARGINTOP}px;
    }

    .flex-item--w50 {
      box-sizing: border-box;
      display: inline-block;
      width: 50%;

      &:first-child {
        padding-right: 50px;
      }

      &:last-child {
        padding-left: 50px;
      }
    }
  }

  .covid--title {
    ${flex_items_postion("center", "center")}
    color: #fff;
    height: 100px;
    font-weight: 900;
    letter-spacing: 0.5rem;

    span {
      display: inline-block;
      font-size: 2rem;
    }
  }

  .covid--menu {
    height: 100px;
    ${flex_items_postion("center", "center")}
    & > ul {
      li {
        display: inline-block;
        text-align: center;

        a {
          display: block;
          padding: 15px;
        }
      }
      li + li {
        margin-left: 10px;
      }

      span {
        width: 100%;
        display: inline-block;
        color: #fff;
        font-size: 1.3rem;
        font-weight: 900;
        letter-spacing: 0.3rem;
      }
    }
  }

  ${maxWidthByBreakPointMobile(
    css`
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

      .covid--menu {
        height: auto;
        & > ul {
          padding: 10px 0;
          width: 100%;

          li {
            a {
              padding: 15px;
              margin: 0 -16px;
              &:hover {
                background-color: white;
                span {
                  color: #000;
                }
              }
            }
          }

          li + li {
            margin-top: 10px;
            margin-left: 0px;
          }
        }
      }
    `
  )}

  ${maxWidthByBreakPointTable(
    css`
      .flex-item {
        &:first-child {
          margin-top: 0;
        }
        .flex-item--w50 {
          width: 100%;

          &:first-child {
            padding-right: 0px;
          }

          &:last-child {
            margin-top: ${HOMECHARTMARGINTOP}px;
            padding-left: 0px;
          }
        }
      }
    `
  )}
`;

FlexBox.defaultProps = {
  position: "sb",
};

// ============================ Main ============================
export const Title = styled.div`
  padding: 30px 10px;
  text-align: center;
  font-size: 2rem;

  ${maxWidthByBreakPointMobile(
    css`
      font-size: 1.5rem;
    `
  )}
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

  //textValue의 트랜지션을 css 로 관리할지 확인
  // text on off 기능 때문에 생각 해봐야함

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
export const HomeTitle = styled.div`
  padding-bottom: 30px;
  text-align: center;
  font-size: 2rem;
`;

// ============================ data on off Toggle ============================
export const ToggleBtnStyled = styled.div`
  padding-bottom: 35px;
  padding-left: 16px;
  padding-right: 16px;
  vertical-align: middle;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .toggle-container {
    display: inline-block;
    width: 45px;
    height: 25px;
    border-radius: 25px;
    border: 3px solid #bfbebe;
    background-color: #f5f2f2;
    position: relative;
    cursor: pointer;
    transition: border-color 300ms;

    .real-checkbox {
      position: absolute;
      clip: rect(0, 0, 0, 0);

      & + .toggle-button {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 30px;
        transition: all 300ms;

        &::before {
          content: "";
          cursor: pointer;
          display: inline-block;
          width: 19px;
          height: 19px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
          transition: all 300ms ease-in-out;
        }
      }

      &:checked + .toggle-button {
        background-color: #32db64;
        &::before {
          margin-left: 20px;
        }
      }
    }
  }
`;

// ============================ data on off Toggle ============================
export const DateShow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 1rem;
`;

export const CovidSearch = styled.div`
  width: 100%;
  flex-wrap: wrap;
  ${flex_items_postion("center", "center")}

  .covid--apiCall {
    padding: 10px 10px;
    span {
      display: inline-block;
      font-size: 1rem;
      font-size: 900;
    }

    span + input {
      margin-left: 10px;
    }

    input {
      border-radius: 2px;
      border: 1px solid;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      padding: 2.5px 0 2.5px 10px;
    }

    button {
      vertical-align: middle;
      background-color: #c0392b;
      color: #fff;
      font-weight: bold;
      font-size: 0.5rem;
      height: 100%;
      cursor: pointer;
      transition: 0.5s;
      border-radius: 5px;
      border: 1px solid transparent;
      letter-spacing: 0.1rem;
      padding-left: 9px;
      padding-top: 5px;
      padding-bottom: 5px;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);

      &:hover {
        background-color: transparent;
        color: #333;
        border: 1px solid;
      }
    }

    ${maxWidthByBreakPointSmallMobile(
      css`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        font-size: 0.7rem;
        text-align: center;

        span {
          width: 100%;
          padding: 10px 5px;
        }

        input {
          width: 100%;
        }

        button {
          width: 100%;
          font-size: 1rem;
        }
      `
    )}
  }
`;

export const MainChartContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 25px;
  margin-bottom: 150px;

  & > div {
    margin: 0px 30px;
  }
`;

export const HomeChartContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 30px;
`;

// ============================ modal ============================
export const ModalStyled = styled.div`
  .modal-fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(127, 140, 141, 0.5);
    z-index: 1;
    transition: 0.5s;
    opacity: 0;
    z-index: -1;
    ${({ modalOnOff }) =>
      modalOnOff &&
      css`
        opacity: 1;
        z-index: 1;
      `}
  }

  .modal--container {
    text-align: center;
    position: absolute;
    border-radius: 5px;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18rem;
    height: 135px;
    background-color: #fff;
    z-index: -1;
    opacity: 0;

    ${({ modalOnOff }) =>
      modalOnOff &&
      css`
        opacity: 1;
        z-index: 1;
      `}

    header {
      padding: 20px;
      font-size: 0.9rem;
      font-weight: bold;
    }

    main {
      button {
        border: 1px solid transparent;
        padding: 7px 10px;
        border-radius: 5px;
        cursor: pointer;
        background-color: rgb(231, 76, 60);
        color: #fff;
        font-weight: bold;
        transition: 0.2s;

        &:hover {
          border: 1px solid #000;
          background-color: #fff;
          color: #000;
        }
      }
    }
  }
`;

// ============================ modal ============================
export const BarSvg = styled.svg`
  border: 2px solid;
  margin-top: 120px;
  overflow: unset;

  rect {
    cursor: pointer;
  }
`;
