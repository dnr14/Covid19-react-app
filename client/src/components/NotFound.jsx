import React from "react";
import { Link } from "react-router-dom";
import { StyledNotFound } from "assets/style/styled";

const NotFound = () => {
  return (
    <StyledNotFound>
      <div className="title">404 Not Found !!</div>
      <div className="title">없는 페이지 입니다. !!</div>
      <div>
        <Link to="/">
          <div className="link">홈으로</div>
        </Link>
      </div>
    </StyledNotFound>
  );
};

export default NotFound;
