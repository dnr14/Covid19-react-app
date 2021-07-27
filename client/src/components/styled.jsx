import styled, { createGlobalStyle } from "styled-components";
import loding from "images/loding.gif";

const GlobalStyled = createGlobalStyle`
  html{
    font-size: 16px;
  }

  body{
      margin: 0;
    }

`;

export default GlobalStyled;

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
