import React from "react";
import "scss/header.scss";

const Header = () => {
  return (
    <>
      <div className="covid--title">
        <span>COVID-19 통계 사이트</span>
      </div>
      <div className="covid--menu">
        <ul>
          <li>
            <a href="/">
              <span>HOME</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
