import React from "react";
import { Link } from "react-router-dom";
import { StyledNotFound } from "assets/style/styled";
import notfound from "assets/images/404.svg";
import styled from "styled-components";
const NotFound = () => {
  return (
    <StyledNotFound>
      <img src={notfound} alt="notfound" />
      <div className="title">없는 페이지 입니다.</div>
      <CustomLink>
        <CustomLink to="/">Home</CustomLink>
      </CustomLink>
    </StyledNotFound>
  );
};

const CustomLink = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 900;
  color: #e74b3c;
`;

export default NotFound;
