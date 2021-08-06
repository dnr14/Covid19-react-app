import React from "react";
import { FlexBox, MaxWidthContainer, Col, Row } from "./style/styled";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header" style={{ backgroundColor: "#e74c3c" }}>
      <Row>
        <Col>
          <MaxWidthContainer>
            <FlexBox>
              <div className="covid--title">
                <span>COVID-19 통계 사이트</span>
              </div>
              <div className="covid--menu">
                <ul>
                  <li>
                    <Link to="/">
                      <span>HOME</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/main">
                      <span>통계</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </FlexBox>
          </MaxWidthContainer>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
