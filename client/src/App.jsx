import { Row, Col, HeaderContainer, FloxBox, MainCatiner } from "components/styled";
import Header from "components/Header";
import Main from "components/Main";
import { MaxWidthConatiner } from "components/styled";

function App() {
  return (
    <>
      <HeaderContainer>
        <Row>
          <Col>
            <MaxWidthConatiner>
              <FloxBox>
                <Header />
              </FloxBox>
            </MaxWidthConatiner>
          </Col>
        </Row>
      </HeaderContainer>
      <MainCatiner>
        <Row>
          <Col>
            <MaxWidthConatiner>
              <Main />
            </MaxWidthConatiner>
          </Col>
        </Row>
      </MainCatiner>
    </>
  );
}

export default App;
